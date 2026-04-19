import { useEffect, useState } from "react";
import axios from "axios";
import { Form, Input, Modal, Select, Switch, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import StoreInformation from "./StoreInformation";
import NotificationPreferences from "./NotificationPreferences";
import BusinessSettings from "./BusinessSettings";
import QuickActions from "./QuickActions";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";
const STORE_SETTINGS_DRAFT_KEY = "vendor_store_settings_draft";
const NOTIFICATION_SETTINGS_KEY = "vendor_notification_settings_draft";
const BUSINESS_SETTINGS_KEY = "vendor_business_settings_draft";
const { Text } = Typography;
const WEEKDAY_OPTIONS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const buildImageUrl = (path) => {
  if (!path) {
    return "";
  }

  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${API_BASE_URL.replace(/\/api\/?$/, "")}/storage/${String(path).replace(
    /^\/+/, 
    ""
  )}`;
};

const getStoredLocalData = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? { ...fallback, ...JSON.parse(value) } : fallback;
  } catch {
    return fallback;
  }
};

const persistStoreDraft = (key, settings) => {
  const draft = {
    storeName: settings.storeName || "",
    storeDescription: settings.storeDescription || "",
    storeEmail: settings.storeEmail || "",
    storePhone: settings.storePhone || "",
    storeAddress: settings.storeAddress || "",
    storeLat: settings.storeLat || "",
    storeLng: settings.storeLng || "",
    storeOperatingDays: Array.isArray(settings.storeOperatingDays)
      ? settings.storeOperatingDays
      : [],
    storeOpeningTime: settings.storeOpeningTime || "",
    storeClosingTime: settings.storeClosingTime || "",
    storeWebsite: settings.storeWebsite || "",
    storeLogo: settings.storeLogo || "",
    storeBanner: settings.storeBanner || "",
    storeCountry: settings.storeCountry || "",
    storeCurrency: settings.storeCurrency || "",
  };

  localStorage.setItem(key, JSON.stringify(draft));
};

const mergeNotificationSettings = (restaurantSettings, fallback) => ({
  ...fallback,
  ...(restaurantSettings || {}),
});

const mergeBusinessSettings = (restaurantSettings, fallback, restaurant = null) => ({
  ...fallback,
  ...(restaurantSettings || {}),
  website:
    restaurant?.website ||
    restaurant?.restaurant_website ||
    restaurantSettings?.website ||
    fallback?.website ||
    "",
  description:
    restaurant?.description ||
    restaurant?.restaurant_description ||
    restaurantSettings?.description ||
    fallback?.description ||
    "",
});

const parseRestaurantSchedule = (value) => {
  const schedule = String(value || "").trim();
  if (!schedule) {
    return {
      days: [],
      openingTime: "",
      closingTime: "",
    };
  }

  const [daysPart, timePartRaw] = schedule.includes("|")
    ? schedule.split("|")
    : ["", schedule];
  const timePart = String(timePartRaw || "").trim();
  const match = timePart.match(
    /(\d{1,2}:\d{2}\s?[AP]M)\s*-\s*(\d{1,2}:\d{2}\s?[AP]M)/i
  );

  const parsedDays = String(daysPart || "")
    .split(",")
    .map((day) => day.trim())
    .filter((day) => WEEKDAY_OPTIONS.includes(day));

  return {
    days: parsedDays,
    openingTime: match?.[1]?.toUpperCase() || "",
    closingTime: match?.[2]?.toUpperCase() || "",
  };
};

const buildRestaurantSchedule = ({
  operatingDays = [],
  openingTime = "",
  closingTime = "",
}) => {
  const normalizedDays = Array.isArray(operatingDays)
    ? operatingDays.filter((day) => WEEKDAY_OPTIONS.includes(day))
    : [];
  const normalizedOpeningTime = String(openingTime || "").trim().toUpperCase();
  const normalizedClosingTime = String(closingTime || "").trim().toUpperCase();

  if (!normalizedOpeningTime || !normalizedClosingTime) {
    return "";
  }

  const timeRange = `${normalizedOpeningTime} - ${normalizedClosingTime}`;
  return normalizedDays.length
    ? `${normalizedDays.join(", ")} | ${timeRange}`
    : timeRange;
};

const mapRestaurantToStoreSettings = (restaurant, fallback = {}) => ({
  ...(() => {
    const parsedSchedule = parseRestaurantSchedule(
      restaurant?.restaurant_open_close_hr
    );
    return {
      storeOperatingDays: parsedSchedule.days,
      storeOpeningTime: parsedSchedule.openingTime,
      storeClosingTime: parsedSchedule.closingTime,
    };
  })(),
  storeName: restaurant?.restaurant_name || "",
  storeDescription:
    restaurant?.restaurant_description || restaurant?.description || "",
  storeEmail: restaurant?.restaurant_email || "",
  storePhone: restaurant?.restaurant_phone || "",
  storeAddress: restaurant?.restaurant_address || "",
  storeLat:
    restaurant?.restaurant_lat === null || restaurant?.restaurant_lat === undefined
      ? ""
      : String(restaurant.restaurant_lat),
  storeLng:
    restaurant?.restaurant_lng === null || restaurant?.restaurant_lng === undefined
      ? ""
      : String(restaurant.restaurant_lng),
  storeLogo: buildImageUrl(restaurant?.restaurant_logo || fallback.storeLogo || ""),
  storeBanner: buildImageUrl(
    restaurant?.restaurant_banner || fallback.storeBanner || ""
  ),
  storeWebsite: restaurant?.restaurant_website || restaurant?.website || "",
  storeCountry: restaurant?.restaurant_country || "",
  storeCurrency: String(restaurant?.restaurant_currency || "").toUpperCase(),
  storeLogoFile: null,
  storeBannerFile: null,
});

const VendorSettings = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";
  const storageScope = token ? token.slice(-16) : "guest";
  const storeDraftKey = `${STORE_SETTINGS_DRAFT_KEY}_${storageScope}`;
  const notificationSettingsKey = `${NOTIFICATION_SETTINGS_KEY}_${storageScope}`;
  const businessSettingsKey = `${BUSINESS_SETTINGS_KEY}_${storageScope}`;

  const storedDraft = getStoredLocalData(storeDraftKey, {});
  const [storeSettings, setStoreSettings] = useState({
    storeName: storedDraft.storeName || "",
    storeDescription: storedDraft.storeDescription || "",
    storeEmail: storedDraft.storeEmail || "",
    storePhone: storedDraft.storePhone || "",
    storeAddress: storedDraft.storeAddress || "",
    storeLat: storedDraft.storeLat || "",
    storeLng: storedDraft.storeLng || "",
    storeOperatingDays: storedDraft.storeOperatingDays || [],
    storeOpeningTime: storedDraft.storeOpeningTime || "",
    storeClosingTime: storedDraft.storeClosingTime || "",
    storeLogo: storedDraft.storeLogo || "",
    storeLogoFile: null,
    storeBanner: storedDraft.storeBanner || "",
    storeBannerFile: null,
    storeWebsite: storedDraft.storeWebsite || "",
    storeCountry: storedDraft.storeCountry || "",
    storeCurrency: storedDraft.storeCurrency || "",
  });
  const [loadingStore, setLoadingStore] = useState(true);
  const [savingStore, setSavingStore] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

  const [notifications, setNotifications] = useState({
    ...getStoredLocalData(notificationSettingsKey, {
      orderNotifications: true,
      paymentNotifications: true,
      inventoryAlerts: true,
      customerMessages: true,
      marketingEmails: false,
      promotionalSms: false,
    }),
  });
  const [savingNotifications, setSavingNotifications] = useState(false);

  const [businessSettings, setBusinessSettings] = useState({
    ...getStoredLocalData(businessSettingsKey, {
      taxId: "12-3456789",
      businessLicense: "BL-987654321",
      returnPolicy: "30-day return policy.",
      shippingPolicy: "Free shipping on orders over $50.",
      privacyPolicy: "We protect your personal information.",
    }),
  });
  const [savingBusiness, setSavingBusiness] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [loadingSecurity, setLoadingSecurity] = useState(false);
  const [savingSecurity, setSavingSecurity] = useState(false);
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    twoFactorChannel: "email",
    hasTransactionPin: false,
  });
  const [securityForm] = Form.useForm();

  useEffect(() => {
    const fetchStoreInfo = async () => {
      if (!token) {
        setLoadingStore(false);
        return;
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/vendor/restaurants?limit=100`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const restaurantRows = response.data?.data || [];
        setRestaurants(restaurantRows);
        const restaurant = restaurantRows[0];
        if (restaurant) {
          setSelectedRestaurantId(restaurant.id);
          const nextSettings = mapRestaurantToStoreSettings(restaurant, storedDraft);
          setStoreSettings((current) => ({
            ...current,
            ...nextSettings,
          }));
          setNotifications((current) =>
            mergeNotificationSettings(
              restaurant.restaurant_notification_settings,
              current
            )
          );
          setBusinessSettings((current) =>
            mergeBusinessSettings(
              restaurant.restaurant_business_settings,
              current,
              restaurant
            )
          );
          persistStoreDraft(storeDraftKey, nextSettings);
        }
      } catch (error) {
        message.error(
          error.response?.data?.message || "Failed to load store information"
        );
      } finally {
        setLoadingStore(false);
      }
    };

    fetchStoreInfo();
  }, [token, storeDraftKey]);

  useEffect(() => {
    if (!selectedRestaurantId || restaurants.length === 0) {
      return;
    }

    const selectedRestaurant = restaurants.find(
      (restaurant) => restaurant.id === selectedRestaurantId
    );
    if (!selectedRestaurant) {
      return;
    }

    const nextSettings = mapRestaurantToStoreSettings(selectedRestaurant, storeSettings);
    setStoreSettings((current) => ({
      ...current,
      ...nextSettings,
    }));
    setNotifications((current) =>
      mergeNotificationSettings(
        selectedRestaurant.restaurant_notification_settings,
        current
      )
    );
    setBusinessSettings((current) =>
      mergeBusinessSettings(
        selectedRestaurant.restaurant_business_settings,
        current,
        selectedRestaurant
      )
    );
    persistStoreDraft(storeDraftKey, nextSettings);
  }, [selectedRestaurantId, restaurants, storeDraftKey]);

  const refreshRestaurants = async (preferredRestaurantId = null) => {
    const refreshed = await axios.get(
      `${API_BASE_URL}/vendor/restaurants?limit=100`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );

    const refreshedRows = refreshed.data?.data || [];
    setRestaurants(refreshedRows);

    const refreshedRestaurant =
      refreshedRows.find(
        (row) => Number(row.id) === Number(preferredRestaurantId)
      ) || refreshedRows[0];

    if (!refreshedRestaurant) {
      setSelectedRestaurantId(null);
      return null;
    }

    setSelectedRestaurantId(refreshedRestaurant.id);

    const nextSettings = mapRestaurantToStoreSettings(
      refreshedRestaurant,
      storeSettings
    );
    setStoreSettings((current) => ({
      ...current,
      ...nextSettings,
    }));
    setNotifications((current) =>
      mergeNotificationSettings(
        refreshedRestaurant.restaurant_notification_settings,
        current
      )
    );
    setBusinessSettings((current) =>
      mergeBusinessSettings(
        refreshedRestaurant.restaurant_business_settings,
        current,
        refreshedRestaurant
      )
    );
    persistStoreDraft(storeDraftKey, nextSettings);

    return refreshedRestaurant;
  };

  const createRestaurantFromCurrentSettings = async () => {
    const storeName = String(storeSettings.storeName || "").trim();
    const storeAddress = String(storeSettings.storeAddress || "").trim();

    if (!storeName || !storeAddress) {
      throw new Error(
        "Store name and business address are required to create your store."
      );
    }

    const formData = new FormData();
    formData.append("restaurant_name", storeName);
    formData.append("restaurant_address", storeAddress);
    formData.append("restaurant_email", storeSettings.storeEmail || "");
    formData.append("restaurant_phone", storeSettings.storePhone || "");
    formData.append("restaurant_country", storeSettings.storeCountry || "");

    const trimmedLat = String(storeSettings.storeLat || "").trim();
    const trimmedLng = String(storeSettings.storeLng || "").trim();
    if (trimmedLat) {
      formData.append("restaurant_lat", trimmedLat);
    }
    if (trimmedLng) {
      formData.append("restaurant_lng", trimmedLng);
    }

    const schedule = buildRestaurantSchedule({
      operatingDays: storeSettings.storeOperatingDays,
      openingTime: storeSettings.storeOpeningTime,
      closingTime: storeSettings.storeClosingTime,
    });
    if (schedule) {
      formData.append("restaurant_open_close_hr", schedule);
    }

    const currency = String(storeSettings.storeCurrency || "")
      .toUpperCase()
      .trim();
    if (currency) {
      formData.append("restaurant_currency", currency);
    }

    if (storeSettings.storeBannerFile) {
      formData.append("restaurant_banner", storeSettings.storeBannerFile);
    }

    const createResponse = await axios.post(
      `${API_BASE_URL}/vendor/restaurants`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const createdRestaurantId = createResponse.data?.data?.id || null;
    const restaurant = await refreshRestaurants(createdRestaurantId);
    if (!restaurant?.id) {
      throw new Error("Store was created but could not be loaded.");
    }

    return restaurant;
  };

  const ensureRestaurantExists = async ({ reason = "save settings" } = {}) => {
    if (selectedRestaurantId) {
      return selectedRestaurantId;
    }

    const existing = restaurants[0];
    if (existing?.id) {
      setSelectedRestaurantId(existing.id);
      return existing.id;
    }

    try {
      const created = await createRestaurantFromCurrentSettings();
      message.success("Store created successfully.");
      return created.id;
    } catch (error) {
      throw new Error(
        error?.response?.data?.message ||
          error?.message ||
          `Please save store information first before you ${reason}.`
      );
    }
  };

  const handleSaveStore = async () => {
    if (!token) {
      message.error("You need to log in as a vendor.");
      return;
    }

    try {
      setSavingStore(true);

      let response = null;
      let restaurantIdForUpdate =
        selectedRestaurantId || restaurants[0]?.id || null;

      if (!restaurantIdForUpdate) {
        const created = await createRestaurantFromCurrentSettings();
        restaurantIdForUpdate = created.id;
      }

      const formData = new FormData();
      if (restaurantIdForUpdate) {
        formData.append("restaurant_id", String(restaurantIdForUpdate));
      }
      formData.append("restaurant_name", storeSettings.storeName);
      formData.append("restaurant_email", storeSettings.storeEmail);
      formData.append("restaurant_phone", storeSettings.storePhone);
      formData.append("restaurant_address", storeSettings.storeAddress);
      formData.append("description", storeSettings.storeDescription);
      formData.append("website", storeSettings.storeWebsite);
      formData.append("restaurant_lat", String(storeSettings.storeLat || "").trim());
      formData.append("restaurant_lng", String(storeSettings.storeLng || "").trim());
      formData.append(
        "restaurant_open_close_hr",
        buildRestaurantSchedule({
          operatingDays: storeSettings.storeOperatingDays,
          openingTime: storeSettings.storeOpeningTime,
          closingTime: storeSettings.storeClosingTime,
        })
      );
      formData.append("restaurant_country", storeSettings.storeCountry || "");
      formData.append(
        "restaurant_currency",
        String(storeSettings.storeCurrency || "").toUpperCase()
      );

      if (storeSettings.storeBannerFile) {
        formData.append("restaurant_banner", storeSettings.storeBannerFile);
      }
      if (storeSettings.storeLogoFile) {
        formData.append(
          "restaurant_logo",
          storeSettings.storeLogoFile,
          storeSettings.storeLogoFile.name
        );
        formData.append(
          "logo",
          storeSettings.storeLogoFile,
          storeSettings.storeLogoFile.name
        );
      }

      response = await axios.post(
        `${API_BASE_URL}/vendor/restaurants/update-info`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedRestaurant = response.data?.data;
      if (updatedRestaurant) {
        const nextSettings = mapRestaurantToStoreSettings(updatedRestaurant, storeSettings);
        setStoreSettings((current) => ({
          ...current,
          ...nextSettings,
        }));
        persistStoreDraft(storeDraftKey, nextSettings);
      } else {
        const nextSettings = {
          ...storeSettings,
          storeLogoFile: null,
          storeBannerFile: null,
        };
        setStoreSettings((current) => ({
          ...current,
          storeLogoFile: null,
          storeBannerFile: null,
        }));
        persistStoreDraft(storeDraftKey, nextSettings);
      }

      await refreshRestaurants(updatedRestaurant?.id || restaurantIdForUpdate);

      message.success("Store information saved successfully");
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to save store information"
      );
    } finally {
      setSavingStore(false);
    }
  };

  const handleSaveNotifications = async () => {
    if (!token) {
      message.error("You need to log in as a vendor.");
      return;
    }

    setSavingNotifications(true);
    try {
      const restaurantId = await ensureRestaurantExists({
        reason: "save notification settings",
      });

      await axios.post(
        `${API_BASE_URL}/vendor/restaurants/update-notification-settings`,
        {
          ...notifications,
          restaurant_id: restaurantId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      localStorage.setItem(
        notificationSettingsKey,
        JSON.stringify(notifications)
      );
      message.success("Notification preferences updated");
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to save notification settings"
      );
    } finally {
      setSavingNotifications(false);
    }
  };

  const handleSaveBusiness = async () => {
    if (!token) {
      message.error("You need to log in as a vendor.");
      return;
    }

    setSavingBusiness(true);
    try {
      const restaurantId = await ensureRestaurantExists({
        reason: "save business settings",
      });

      await axios.post(
        `${API_BASE_URL}/vendor/restaurants/update-business-settings`,
        {
          ...businessSettings,
          restaurant_id: restaurantId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      localStorage.setItem(
        businessSettingsKey,
        JSON.stringify(businessSettings)
      );
      message.success("Business settings updated successfully");
    } catch (error) {
      message.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to save business settings"
      );
    } finally {
      setSavingBusiness(false);
    }
  };

  const handleQuickAction = (actionKey) => {
    if (actionKey === "analytics") {
      navigate("/vendors/analytics");
      return;
    }

    if (actionKey === "payment") {
      navigate("/vendors/wallet");
      return;
    }

    if (actionKey === "security") {
      setIsSecurityModalOpen(true);
      fetchSecuritySettings();
    }
  };

  const fetchSecuritySettings = async () => {
    if (!token) {
      return;
    }

    setLoadingSecurity(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/vendor/security-settings`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const settings = response.data?.data || {};
      const nextState = {
        twoFactorEnabled: Boolean(settings.two_factor_enabled),
        twoFactorChannel: settings.two_factor_channel || "email",
        hasTransactionPin: Boolean(settings.has_transaction_pin),
      };
      setSecuritySettings(nextState);
      securityForm.setFieldsValue({
        twoFactorEnabled: nextState.twoFactorEnabled,
        twoFactorChannel: nextState.twoFactorChannel,
        currentPassword: "",
        newPassword: "",
        newPasswordConfirmation: "",
        transactionPin: "",
        transactionPinConfirmation: "",
      });
    } catch (error) {
      message.error(
        error.response?.data?.message || "Failed to load security settings."
      );
    } finally {
      setLoadingSecurity(false);
    }
  };

  const handleSaveSecurity = async () => {
    if (!token) {
      message.error("You need to log in as a vendor.");
      return;
    }

    const values = await securityForm.validateFields();
    const hasPasswordInput =
      values.currentPassword || values.newPassword || values.newPasswordConfirmation;

    try {
      setSavingSecurity(true);

      if (hasPasswordInput) {
        await axios.post(
          `${API_BASE_URL}/vendor/change-password`,
          {
            current_password: values.currentPassword,
            new_password: values.newPassword,
            new_password_confirmation: values.newPasswordConfirmation,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
      }

      await axios.post(
        `${API_BASE_URL}/vendor/security-settings`,
        {
          two_factor_enabled: Boolean(values.twoFactorEnabled),
          two_factor_channel: values.twoFactorEnabled
            ? values.twoFactorChannel || "email"
            : null,
          transaction_pin: values.transactionPin || null,
          transaction_pin_confirmation: values.transactionPinConfirmation || null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      setSecuritySettings({
        twoFactorEnabled: Boolean(values.twoFactorEnabled),
        twoFactorChannel: values.twoFactorChannel || "email",
        hasTransactionPin: values.transactionPin
          ? true
          : securitySettings.hasTransactionPin,
      });
      message.success("Security settings updated successfully.");
      setIsSecurityModalOpen(false);
      securityForm.resetFields();
    } catch (error) {
      const validationErrors = error.response?.data?.errors;
      if (validationErrors && typeof validationErrors === "object") {
        const firstError = Object.values(validationErrors)[0];
        message.error(Array.isArray(firstError) ? firstError[0] : "Validation failed.");
      } else {
        message.error(
          error.response?.data?.message || "Failed to update security settings."
        );
      }
    } finally {
      setSavingSecurity(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <StoreInformation
        storeSettings={storeSettings}
        setStoreSettings={setStoreSettings}
        onSave={handleSaveStore}
        saving={savingStore}
        loading={loadingStore}
      />
      <NotificationPreferences
        notifications={notifications}
        setNotifications={setNotifications}
        onSave={handleSaveNotifications}
        saving={savingNotifications}
      />
      <BusinessSettings
        businessSettings={businessSettings}
        setBusinessSettings={setBusinessSettings}
        onSave={handleSaveBusiness}
        saving={savingBusiness}
      />
      <QuickActions onAction={handleQuickAction} />

      <Modal
        open={isSecurityModalOpen}
        title="Security Settings"
        onCancel={() => setIsSecurityModalOpen(false)}
        onOk={handleSaveSecurity}
        okText="Save Security Settings"
        confirmLoading={savingSecurity}
        destroyOnClose
      >
        <Form
          form={securityForm}
          layout="vertical"
          initialValues={{
            twoFactorEnabled: securitySettings.twoFactorEnabled,
            twoFactorChannel: securitySettings.twoFactorChannel,
            transactionPin: "",
            transactionPinConfirmation: "",
          }}
        >
          <Form.Item name="twoFactorEnabled" label="Enable 2FA" valuePropName="checked">
            <Switch checkedChildren="Enabled" unCheckedChildren="Disabled" />
          </Form.Item>

          <Form.Item
            noStyle
            shouldUpdate={(prev, curr) =>
              prev.twoFactorEnabled !== curr.twoFactorEnabled
            }
          >
            {({ getFieldValue }) =>
              getFieldValue("twoFactorEnabled") ? (
                <Form.Item
                  name="twoFactorChannel"
                  label="2FA Channel"
                  rules={[{ required: true, message: "Select a 2FA channel." }]}
                >
                  <Select
                    options={[
                      { label: "Email OTP", value: "email" },
                      { label: "SMS OTP", value: "sms" },
                    ]}
                  />
                </Form.Item>
              ) : null
            }
          </Form.Item>

          <Text strong>Change Password</Text>
          <div style={{ marginBottom: 8 }} />

          <Form.Item
            name="currentPassword"
            label="Current Password"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!getFieldValue("newPassword") && !value) {
                    return Promise.resolve();
                  }
                  if (value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Current password is required."));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Enter current password" />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!getFieldValue("currentPassword") && !value) {
                    return Promise.resolve();
                  }
                  if (!value) {
                    return Promise.reject(new Error("New password is required."));
                  }
                  if (String(value).length < 8) {
                    return Promise.reject(
                      new Error("New password must be at least 8 characters.")
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>

          <Form.Item
            name="newPasswordConfirmation"
            label="Confirm New Password"
            dependencies={["newPassword"]}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const newPassword = getFieldValue("newPassword");
                  if (!newPassword && !value) {
                    return Promise.resolve();
                  }
                  if (!value) {
                    return Promise.reject(new Error("Please confirm the new password."));
                  }
                  if (value !== newPassword) {
                    return Promise.reject(new Error("Passwords do not match."));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm new password" />
          </Form.Item>

          <Text strong>Transaction PIN</Text>
          <div style={{ marginBottom: 8 }}>
            <Text type="secondary">
              {securitySettings.hasTransactionPin
                ? "Transaction PIN is already set. Enter a new PIN to change it."
                : "Set a 6-digit transaction PIN for withdrawals."}
            </Text>
          </div>

          <Form.Item
            name="transactionPin"
            label="New Transaction PIN"
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const confirmation = getFieldValue("transactionPinConfirmation");
                  if (!value && !confirmation) {
                    return Promise.resolve();
                  }
                  if (!value) {
                    return Promise.reject(new Error("Transaction PIN is required."));
                  }
                  if (!/^[0-9]{6}$/.test(String(value))) {
                    return Promise.reject(new Error("Transaction PIN must be 6 digits."));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input.Password inputMode="numeric" maxLength={6} placeholder="******" />
          </Form.Item>

          <Form.Item
            name="transactionPinConfirmation"
            label="Confirm Transaction PIN"
            dependencies={["transactionPin"]}
            rules={[
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const pin = getFieldValue("transactionPin");
                  if (!pin && !value) {
                    return Promise.resolve();
                  }
                  if (!value) {
                    return Promise.reject(new Error("Please confirm transaction PIN."));
                  }
                  if (value !== pin) {
                    return Promise.reject(new Error("Transaction PIN does not match."));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input.Password inputMode="numeric" maxLength={6} placeholder="******" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default VendorSettings;
