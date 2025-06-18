import { useState } from "react";
import {
  ArrowLeft,
  MessageCircle,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

interface CheckoutFormProps {
  onBack: () => void;
  onClose: () => void;
}

interface LatLng {
  lat: number;
  lng: number;
}

// Leaflet marker fix
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const LocationPicker = ({
  position,
  setPosition,
}: {
  position: LatLng | null;
  setPosition: (pos: LatLng) => void;
}) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return position ? <Marker position={position} /> : null;
};

const CheckoutForm = ({ onBack, onClose }: CheckoutFormProps) => {
  const { items, getTotalPrice, clearCart } = useCart();
  const subtotalPrice = getTotalPrice();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    notes: "",
    location: "",
  });

  const [showMap, setShowMap] = useState(false);
  const [markerPosition, setMarkerPosition] = useState<LatLng | null>(null);
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedDiscountCode, setAppliedDiscountCode] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<
    { display_name: string; lat: string; lon: string }[]
  >([]);
  const [isSearching, setIsSearching] = useState(false);

  const availableDiscountCodes = {
    SID10: 0.1,
    NMK05: 0.05,
  };

  const applyDiscount = () => {
    const code = discountCode.toUpperCase();
    if (availableDiscountCodes[code]) {
      const discountPercentage = availableDiscountCodes[code];
      const discount = subtotalPrice * discountPercentage;
      setDiscountAmount(discount);
      setAppliedDiscountCode(code);
      toast.success(`Discount code "${code}" applied!`);
    } else {
      setDiscountAmount(0);
      setAppliedDiscountCode("");
      toast.error("Invalid discount code.");
    }
  };

  const finalTotalPrice = subtotalPrice - discountAmount;
  const vatRate = 0.05;
  const vatAmount = finalTotalPrice * vatRate;
  const totalIncludingTaxes = finalTotalPrice + vatAmount;

  const updateLocationFromMarker = (pos: LatLng) => {
    setMarkerPosition(pos);
    setFormData((prev) => ({
      ...prev,
      location: `${pos.lat.toFixed(6)}, ${pos.lng.toFixed(6)}`,
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "location") setMarkerPosition(null);
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query) return setSearchResults([]);
    setIsSearching(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}`
      );
      const data = await res.json();
      setSearchResults(data);
    } catch {
      setSearchResults([]);
    }
    setIsSearching(false);
  };

  const selectSearchResult = (result: {
    lat: string;
    lon: string;
    display_name: string;
  }) => {
    const lat = parseFloat(result.lat);
    const lng = parseFloat(result.lon);
    setMarkerPosition({ lat, lng });
    setFormData((prev) => ({
      ...prev,
      location: `${lat.toFixed(6)}, ${lng.toFixed(6)}`,
    }));
    setSearchQuery(result.display_name);
    setSearchResults([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    const orderDetails = items
      .map(
        (item) =>
          `• ${item.name} x${item.quantity} - AED ${(item.price * item.quantity).toFixed(2)}`
      )
      .join("\n");

    const message = `*New Order - Ruh Essenza*

*Customer Information:*
Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email || "N/A"}

*Address:*
${formData.address}
${formData.city || ""}

${formData.location ? `*Shared Location:* ${formData.location}` : ""}

*Order Details:*
${orderDetails}

*Subtotal: AED ${subtotalPrice.toFixed(2)}*
${
  discountAmount > 0
    ? `*Discount (${appliedDiscountCode}): -AED ${discountAmount.toFixed(2)}*\n`
    : ""
}
*VAT: AED ${vatAmount.toFixed(2)}*
*Total: AED ${totalIncludingTaxes.toFixed(2)}*

${formData.notes ? `*Notes:* ${formData.notes}` : ""}

Thank you for your order. The *Ruh Essenza* delivery team will reach out to schedule the delivery.`;

    const whatsappUrl = `https://wa.me/971509027555?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
    clearCart();
    toast.success("Order sent via WhatsApp!");
    onClose();
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-black-500/20">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="bg-black-400 mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-2xl font-bold text-black">Checkout</h2>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 overflow-y-auto p-6 space-y-6"
      >
        {/* Personal Info */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-black border-b pb-2">
            Personal Information
          </h3>
          <InputField id="name" label="Full Name *" value={formData.name} onChange={handleInputChange} required />
          <InputField id="phone" label="Phone Number *" type="tel" value={formData.phone} onChange={handleInputChange} required />
          <InputField id="email" label="Email Address" type="email" value={formData.email} onChange={handleInputChange} />
        </section>

        {/* Address Info */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-black border-b pb-2">
            Delivery Address
          </h3>
          <Label className="text-black">Street Address *</Label>
          <Textarea
            id="address"
            name="address"
            rows={3}
            required
            value={formData.address}
            onChange={handleInputChange}
            className="bg-white border text-black"
          />
          <InputField id="city" label="City" value={formData.city} onChange={handleInputChange} />
        </section>

        {/* Location Picker */}
        <section className="space-y-2">
          <Label htmlFor="location" className="text-black">
            Share Your Location
          </Label>
          <div className="flex items-center space-x-2">
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Paste or select your location"
              className="bg-white border text-black"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowMap(true)}
              title="Pick location on map"
            >
              <MapPin />
            </Button>
          </div>
        </section>

        {/* Map Modal */}
        {showMap && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-lg w-[90vw] max-w-3xl h-[70vh] flex flex-col">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="font-bold text-lg text-black">Pick your location</h3>
                <Button variant="ghost" size="icon" onClick={() => setShowMap(false)}>✕</Button>
              </div>
              <div className="p-4 border-b">
                <Input
                  type="text"
                  placeholder="Search for location..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full bg-white border text-black"
                />
                {isSearching && <p className="text-sm text-gray-600 mt-1">Searching...</p>}
                {searchResults.length > 0 && (
                  <ul className="max-h-40 overflow-auto mt-2 border rounded bg-white text-black">
                    {searchResults.map((result, idx) => (
                      <li
                        key={idx}
                        onClick={() => selectSearchResult(result)}
                        className="cursor-pointer p-2 hover:bg-gray-200 border-b last:border-b-0"
                      >
                        {result.display_name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <MapContainer
                center={markerPosition ?? { lat: 25.276987, lng: 55.296249 }}
                zoom={markerPosition ? 13 : 10}
                style={{ flexGrow: 1 }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationPicker position={markerPosition} setPosition={updateLocationFromMarker} />
              </MapContainer>
              <div className="p-4 border-t flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowMap(false)}>Cancel</Button>
                <Button onClick={() => setShowMap(false)} disabled={!markerPosition}>Confirm Location</Button>
              </div>
            </div>
          </div>
        )}

        {/* Notes */}
        <div>
          <Label htmlFor="notes" className="text-black">Additional Notes</Label>
          <Textarea id="notes" name="notes" rows={3} value={formData.notes} onChange={handleInputChange} className="bg-white border text-black" />
        </div>

        {/* Discount */}
        <div className="space-y-2">
          <Label htmlFor="discountCode" className="text-black">Discount Code</Label>
          <div className="flex space-x-2">
            <Input
              id="discountCode"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="Enter code"
              className="bg-white border text-black"
            />
            <Button type="button" className="bg-black" onClick={applyDiscount}>Apply</Button>
          </div>
          {discountAmount > 0 && (
            <p className="text-green-600 font-semibold">
              Discount applied: AED {discountAmount.toFixed(2)}
            </p>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-100 rounded-lg p-4 border border-gray-300 space-y-2">
          <h4 className="text-black font-semibold mb-2">Order Summary</h4>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm text-black/90">
              <span>{item.name} x{item.quantity}</span>
              <span>AED {(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-2 text-sm text-black space-y-1">
            <div className="flex justify-between"><span>Items:</span><span>{totalItems}</span></div>
            <div className="flex justify-between"><span>Subtotal:</span><span>AED {subtotalPrice.toFixed(2)}</span></div>
            {discountAmount > 0 && <div className="flex justify-between text-red-600"><span>Discount ({appliedDiscountCode}):</span><span>-AED {discountAmount.toFixed(2)}</span></div>}
            <div className="flex justify-between"><span>VAT:</span><span>AED {vatAmount.toFixed(2)}</span></div>
            <div className="flex justify-between font-semibold text-lg border-t pt-2">
              <span>Total:</span>
              <span>
                <img src="/lovable-uploads/dlogo.png" alt="currency" className="w-5 h-5 inline-block mr-1" />
                {totalIncludingTaxes.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </form>

      {/* Footer */}
      <div className="border-t border-black-500/20 p-6">
        <Button
          type="submit"
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 rounded-full transform hover:scale-105 transition-all duration-300"
        >
          <MessageCircle className="h-5 w-5 mr-2" />
          Complete Order via WhatsApp
        </Button>
        <p className="text-black text-xs mt-2 text-center">
          You'll be redirected to WhatsApp to confirm your order
        </p>
      </div>
    </div>
  );
};

// Small reusable component
const InputField = ({
  id,
  label,
  type = "text",
  ...props
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) => (
  <div>
    <Label htmlFor={id} className="text-black">
      {label}
    </Label>
    <Input
      id={id}
      name={id}
      type={type}
      className="bg-white border text-black"
      {...props}
    />
  </div>
);

export default CheckoutForm;
