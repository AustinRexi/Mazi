import {
  AutoComplete,
  Card,
  Form,
  Input,
  Button,
  Row,
  Col,
  Select,
  TimePicker,
  Typography,
  message,
  Spin,
} from "antd";
import {
  UploadOutlined,
  SaveOutlined,
  ShopOutlined,
  CameraOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const { TextArea } = Input;
const { Title, Paragraph } = Typography;
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
const COUNTRY_TO_CURRENCY = {
  Algeria: "DZD",
  Argentina: "ARS",
  Australia: "AUD",
  Austria: "EUR",
  Belgium: "EUR",
  Brazil: "BRL",
  Canada: "CAD",
  China: "CNY",
  Denmark: "DKK",
  Egypt: "EGP",
  Ethiopia: "ETB",
  Finland: "EUR",
  France: "EUR",
  Germany: "EUR",
  Ghana: "GHS",
  India: "INR",
  Indonesia: "IDR",
  Ireland: "EUR",
  Italy: "EUR",
  Japan: "JPY",
  Kenya: "KES",
  Luxembourg: "EUR",
  Malaysia: "MYR",
  Morocco: "MAD",
  Netherlands: "EUR",
  "New Zealand": "NZD",
  Nigeria: "NGN",
  Norway: "NOK",
  Pakistan: "PKR",
  Philippines: "PHP",
  Poland: "PLN",
  Portugal: "EUR",
  Rwanda: "RWF",
  "Saudi Arabia": "SAR",
  Senegal: "XOF",
  Singapore: "SGD",
  "South Africa": "ZAR",
  Spain: "EUR",
  Sweden: "SEK",
  Switzerland: "CHF",
  Tanzania: "TZS",
  Thailand: "THB",
  Tunisia: "TND",
  Turkey: "TRY",
  Uganda: "UGX",
  "United Arab Emirates": "AED",
  "United Kingdom": "GBP",
  "United States": "USD",
  Zambia: "ZMW",
  Zimbabwe: "USD",
};
const COUNTRY_OPTIONS = Object.keys(COUNTRY_TO_CURRENCY)
  .sort((left, right) => left.localeCompare(right))
  .map((country) => ({
    label: country,
    value: country,
  }));
const CURRENCY_OPTIONS = [...new Set(Object.values(COUNTRY_TO_CURRENCY))]
  .sort()
  .map((currencyCode) => ({
    label: currencyCode,
    value: currencyCode,
  }));
const WEEKDAY_OPTIONS = [
  { label: "Mon", value: "Mon" },
  { label: "Tue", value: "Tue" },
  { label: "Wed", value: "Wed" },
  { label: "Thu", value: "Thu" },
  { label: "Fri", value: "Fri" },
  { label: "Sat", value: "Sat" },
  { label: "Sun", value: "Sun" },
];

const parseTimeValue = (value) => {
  if (!value) {
    return null;
  }

  const parsed = dayjs(value, "hh:mm A", true);
  return parsed.isValid() ? parsed : null;
};

const StoreInformation = ({
  storeSettings,
  setStoreSettings,
  onSave,
  saving,
  loading,
}) => {
  const navigate = useNavigate();
  const logoInputRef = useRef(null);
  const bannerInputRef = useRef(null);
  const addressSearchTimeoutRef = useRef(null);
  const [placesError, setPlacesError] = useState("");
  const [addressOptions, setAddressOptions] = useState([]);
  const [loadingAddressOptions, setLoadingAddressOptions] = useState(false);
  const [addressSearchValue, setAddressSearchValue] = useState(
    storeSettings.storeAddress || ""
  );

  useEffect(() => {
    setAddressSearchValue(storeSettings.storeAddress || "");
  }, [storeSettings.storeAddress]);

  useEffect(() => {
    return () => {
      if (addressSearchTimeoutRef.current) {
        window.clearTimeout(addressSearchTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setPlacesError(
      GOOGLE_MAPS_API_KEY
        ? ""
        : "Google Places is not configured. Add VITE_GOOGLE_MAPS_API_KEY to enable address search."
    );
  }, []);

  const searchPlaces = async (query) => {
    const trimmedQuery = String(query || "").trim();

    if (!GOOGLE_MAPS_API_KEY || trimmedQuery.length < 3) {
      setAddressOptions([]);
      setLoadingAddressOptions(false);
      setPlacesError(
        GOOGLE_MAPS_API_KEY || trimmedQuery.length === 0
          ? ""
          : "Type at least 3 characters to search addresses."
      );
      return;
    }

    setLoadingAddressOptions(true);

    try {
      const response = await fetch(
        "https://places.googleapis.com/v1/places:autocomplete",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
            "X-Goog-FieldMask":
              "suggestions.placePrediction.placeId,suggestions.placePrediction.text.text",
          },
          body: JSON.stringify({
            input: trimmedQuery,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Autocomplete request failed.");
      }

      const data = await response.json();
      const options = Array.isArray(data?.suggestions)
        ? data.suggestions
            .map((suggestion) => {
              const prediction = suggestion.placePrediction;
              return prediction?.placeId && prediction?.text?.text
                ? {
                    value: prediction.text.text,
                    label: prediction.text.text,
                    placeId: prediction.placeId,
                  }
                : null;
            })
            .filter(Boolean)
        : [];

      setAddressOptions(options);
      setPlacesError(
        options.length ? "" : "No Google Places matches found for this address."
      );
    } catch {
      setAddressOptions([]);
      setPlacesError("Failed to load Google Places address search.");
    } finally {
      setLoadingAddressOptions(false);
    }
  };

  const handleAddressSearch = (value) => {
    setAddressSearchValue(value);
    setStoreSettings((current) => ({
      ...current,
      storeAddress: value,
    }));

    if (addressSearchTimeoutRef.current) {
      window.clearTimeout(addressSearchTimeoutRef.current);
    }

    addressSearchTimeoutRef.current = window.setTimeout(() => {
      searchPlaces(value);
    }, 300);
  };

  const handleAddressSelect = async (_value, option) => {
    const placeId = option?.placeId;
    if (!GOOGLE_MAPS_API_KEY || !placeId) {
      return;
    }

    setLoadingAddressOptions(true);

    try {
      const response = await fetch(
        `https://places.googleapis.com/v1/places/${placeId}`,
        {
          headers: {
            "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
            "X-Goog-FieldMask": "formattedAddress,location",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Place details request failed.");
      }

      const data = await response.json();
      const formattedAddress = data?.formattedAddress || option.value || "";
      const lat = data?.location?.latitude;
      const lng = data?.location?.longitude;

      setAddressSearchValue(formattedAddress);
      setAddressOptions([]);
      setStoreSettings((current) => ({
        ...current,
        storeAddress: formattedAddress,
        storeLat:
          typeof lat === "number" && Number.isFinite(lat)
            ? String(lat)
            : current.storeLat,
        storeLng:
          typeof lng === "number" && Number.isFinite(lng)
            ? String(lng)
            : current.storeLng,
      }));
      setPlacesError("");
    } catch {
      setPlacesError("Failed to fetch selected place details.");
    } finally {
      setLoadingAddressOptions(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("profileImage");

    message.success("You have been logged out.");
    navigate("/login");
  };

  const handleSelectLogo = () => {
    logoInputRef.current?.click();
  };

  const handleSelectBanner = () => {
    bannerInputRef.current?.click();
  };

  const handleLogoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setStoreSettings((current) => ({
      ...current,
      storeLogoFile: file,
      storeLogo: previewUrl,
    }));
  };

  const handleBannerChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setStoreSettings((current) => ({
      ...current,
      storeBannerFile: file,
      storeBanner: previewUrl,
    }));
  };

  return (
    <Card
      title={
        <Title level={4}>
          <ShopOutlined style={{ color: "#52c41a", marginRight: 8 }} />
          Store Information
        </Title>
      }
      bordered
    >
      <Paragraph type="secondary">
        Manage your store details and public information.
      </Paragraph>
      <Spin spinning={loading}>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8} style={{ textAlign: "center" }}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: "#f5f5f5",
                  border: "1px solid #f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {storeSettings.storeLogo ? (
                  <img
                    src={storeSettings.storeLogo}
                    alt="Store logo"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <ShopOutlined style={{ fontSize: 28, color: "#bfbfbf" }} />
                )}
              </div>
              <Button
                icon={<CameraOutlined />}
                shape="circle"
                size="small"
                style={{ position: "absolute", bottom: 0, right: 0 }}
                onClick={handleSelectLogo}
              />
            </div>
            <Paragraph>Logo for your store</Paragraph>
            <input
              ref={logoInputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleLogoChange}
            />
            <Button icon={<UploadOutlined />} onClick={handleSelectLogo}>
              Upload New Logo
            </Button>

            <div style={{ marginTop: 24, textAlign: "left" }}>
              <Paragraph strong style={{ marginBottom: 8 }}>
                Company Banner
              </Paragraph>
              <Paragraph type="secondary" style={{ marginBottom: 12 }}>
                Uploaded image should be 900 x 600 pixels
              </Paragraph>
              <div
                style={{
                  width: "100%",
                  maxWidth: 420,
                  aspectRatio: "3 / 2",
                  minHeight: 180,
                  borderRadius: 16,
                  overflow: "hidden",
                  background: "#f5f5f5",
                  border: "1px solid #f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto",
                }}
              >
                {storeSettings.storeBanner ? (
                  <img
                    src={storeSettings.storeBanner}
                    alt="Store banner"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                    No banner uploaded yet
                  </Paragraph>
                )}
              </div>
              <input
                ref={bannerInputRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleBannerChange}
              />
              <Button
                icon={<UploadOutlined />}
                onClick={handleSelectBanner}
                style={{ marginTop: 12 }}
              >
                Upload Company Banner
              </Button>
            </div>
          </Col>

          <Col xs={24} md={16}>
            <Form layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Store Name">
                    <Input
                      value={storeSettings.storeName}
                      onChange={(e) =>
                        setStoreSettings((current) => ({
                          ...current,
                          storeName: e.target.value,
                        }))
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Website">
                    <Input
                      value={storeSettings.storeWebsite}
                      onChange={(e) =>
                        setStoreSettings((current) => ({
                          ...current,
                          storeWebsite: e.target.value,
                        }))
                      }
                      placeholder="Stored locally only"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="Store Description">
                <TextArea
                  rows={4}
                  value={storeSettings.storeDescription}
                  onChange={(e) =>
                    setStoreSettings((current) => ({
                      ...current,
                      storeDescription: e.target.value,
                    }))
                  }
                />
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Contact Email">
                    <Input
                      prefix={<MailOutlined />}
                      value={storeSettings.storeEmail}
                      onChange={(e) =>
                        setStoreSettings((current) => ({
                          ...current,
                          storeEmail: e.target.value,
                        }))
                      }
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Phone Number">
                    <Input
                      prefix={<PhoneOutlined />}
                      value={storeSettings.storePhone}
                      onChange={(e) =>
                        setStoreSettings((current) => ({
                          ...current,
                          storePhone: e.target.value,
                        }))
                      }
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="Business Address">
                <AutoComplete
                  value={addressSearchValue}
                  options={addressOptions}
                  onChange={handleAddressSearch}
                  onSelect={handleAddressSelect}
                  filterOption={false}
                  open={
                    Boolean(addressSearchValue) &&
                    (loadingAddressOptions || addressOptions.length > 0)
                  }
                  notFoundContent={
                    loadingAddressOptions ? "Loading addresses..." : "No address found"
                  }
                >
                  <Input
                    prefix={<EnvironmentOutlined />}
                    status={placesError ? "warning" : ""}
                    placeholder={
                      placesError
                        ? "Google Places not available"
                        : "Search address"
                  }
                  />
                </AutoComplete>
                {placesError ? (
                  <Paragraph
                    type="warning"
                    style={{ marginTop: 8, marginBottom: 0 }}
                  >
                    {placesError}
                  </Paragraph>
                ) : null}
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Latitude">
                    <Input
                      value={storeSettings.storeLat}
                      onChange={(e) =>
                        setStoreSettings((current) => ({
                          ...current,
                          storeLat: e.target.value,
                        }))
                      }
                      placeholder="e.g. 6.5244"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Longitude">
                    <Input
                      value={storeSettings.storeLng}
                      onChange={(e) =>
                        setStoreSettings((current) => ({
                          ...current,
                          storeLng: e.target.value,
                        }))
                      }
                      placeholder="e.g. 3.3792"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Country">
                    <Select
                      mode="tags"
                      maxCount={1}
                      showSearch
                      allowClear
                      optionFilterProp="label"
                      options={COUNTRY_OPTIONS}
                      value={
                        storeSettings.storeCountry ? [storeSettings.storeCountry] : []
                      }
                      onChange={(value) =>
                        {
                          const selectedCountry = Array.isArray(value)
                            ? value[value.length - 1] || ""
                            : value || "";

                          setStoreSettings((current) => ({
                            ...current,
                            storeCountry: selectedCountry,
                            storeCurrency:
                              selectedCountry && COUNTRY_TO_CURRENCY[selectedCountry]
                                ? COUNTRY_TO_CURRENCY[selectedCountry]
                                : current.storeCurrency,
                          }));
                        }
                      }
                      placeholder="Search and select country"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Currency (ISO code)">
                    <Select
                      showSearch
                      allowClear
                      optionFilterProp="label"
                      options={CURRENCY_OPTIONS}
                      value={storeSettings.storeCurrency}
                      onChange={(value) =>
                        setStoreSettings((current) => ({
                          ...current,
                          storeCurrency: value || "",
                        }))
                      }
                      placeholder="Search and select ISO code"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item label="Operating Days">
                    <Select
                      mode="multiple"
                      allowClear
                      value={storeSettings.storeOperatingDays}
                      onChange={(value) =>
                        setStoreSettings((current) => ({
                          ...current,
                          storeOperatingDays: value,
                        }))
                      }
                      options={WEEKDAY_OPTIONS}
                      placeholder="Select the days your store is open"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Opening Time">
                    <TimePicker
                      use12Hours
                      format="hh:mm A"
                      value={parseTimeValue(storeSettings.storeOpeningTime)}
                      onChange={(value) =>
                        setStoreSettings((current) => ({
                          ...current,
                          storeOpeningTime: value ? value.format("hh:mm A") : "",
                        }))
                      }
                      style={{ width: "100%" }}
                      placeholder="Select opening time"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Closing Time">
                    <TimePicker
                      use12Hours
                      format="hh:mm A"
                      value={parseTimeValue(storeSettings.storeClosingTime)}
                      onChange={(value) =>
                        setStoreSettings((current) => ({
                          ...current,
                          storeClosingTime: value ? value.format("hh:mm A") : "",
                        }))
                      }
                      style={{ width: "100%" }}
                      placeholder="Select closing time"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <div style={{ display: "flex", gap: "10px" }}>
                <Button
                  type="primary"
                  icon={<SaveOutlined />}
                  onClick={onSave}
                  loading={saving}
                >
                  Save Store Information
                </Button>
                <Button onClick={handleLogout}>Logout</Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Spin>
    </Card>
  );
};

export default StoreInformation;
