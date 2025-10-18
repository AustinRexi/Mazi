import { useState } from "react";
import { message } from "antd";
import StoreInformation from "./StoreInformation";
import NotificationPreferences from "./NotificationPreferences";
import BusinessSettings from "./BusinessSettings";
import QuickActions from "./QuickActions";

const VendorSettings = () => {
  const [storeSettings, setStoreSettings] = useState({
    storeName: "John's Electronics",
    storeDescription:
      "Premium electronics and gadgets for the modern lifestyle.",
    storeEmail: "john@electronics.com",
    storePhone: "+1 (555) 123-4567",
    storeAddress: "123 Tech Street, Silicon Valley, CA 94000",
    storeLogo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces",
    storeWebsite: "https://johnselectronics.com",
  });

  const [notifications, setNotifications] = useState({
    orderNotifications: true,
    paymentNotifications: true,
    inventoryAlerts: true,
    customerMessages: true,
    marketingEmails: false,
    promotionalSms: false,
  });

  const [businessSettings, setBusinessSettings] = useState({
    taxId: "12-3456789",
    businessLicense: "BL-987654321",
    returnPolicy: "30-day return policy.",
    shippingPolicy: "Free shipping on orders over $50.",
    privacyPolicy: "We protect your personal information.",
  });

  const handleSaveStore = () =>
    message.success("Store settings updated successfully");
  const handleSaveNotifications = () =>
    message.success("Notification preferences updated");
  const handleSaveBusiness = () =>
    message.success("Business settings updated successfully");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <StoreInformation
        storeSettings={storeSettings}
        setStoreSettings={setStoreSettings}
        onSave={handleSaveStore}
      />
      <NotificationPreferences
        notifications={notifications}
        setNotifications={setNotifications}
        onSave={handleSaveNotifications}
      />
      <BusinessSettings
        businessSettings={businessSettings}
        setBusinessSettings={setBusinessSettings}
        onSave={handleSaveBusiness}
      />
      <QuickActions />
    </div>
  );
};

export default VendorSettings;
