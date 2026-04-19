import {
  Alert,
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
const GOOGLE_MAPS_SCRIPT_ID = "google-maps-places-script";
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
  const autocompleteContainerRef = useRef(null);
  const autocompleteElementRef = useRef(null);
  const [placesError, setPlacesError] = useState("");

  useEffect(() => {
    if (!GOOGLE_MAPS_API_KEY || !autocompleteContainerRef.current) {
      setPlacesError(
        GOOGLE_MAPS_API_KEY
          ? ""
          : "Google Places is not configured. Add VITE_GOOGLE_MAPS_API_KEY to enable address search."
      );
      return undefined;
    }

    let cancelled = false;

    const initializeAutocomplete = async () => {
      if (
        cancelled ||
        !autocompleteContainerRef.current ||
        autocompleteElementRef.current
      ) {
        return;
      }

      if (!window.google?.maps?.importLibrary) {
        return;
      }

      try {
        await window.google.maps.importLibrary("places");

        if (cancelled || !autocompleteContainerRef.current) {
          return;
        }

        const placeAutocomplete =
          new window.google.maps.places.PlaceAutocompleteElement();
        placeAutocomplete.style.width = "100%";
        placeAutocomplete.style.display = "block";
        placeAutocomplete.setAttribute("placeholder", "Search address");

        placeAutocomplete.addEventListener(
          "gmp-select",
          async ({ placePrediction }) => {
            const place = placePrediction?.toPlace?.();
            if (!place) {
              return;
            }

            await place.fetchFields({
              fields: ["formattedAddress", "location"],
            });

            const lat = place.location?.lat?.();
            const lng = place.location?.lng?.();

            setStoreSettings((current) => ({
              ...current,
              storeAddress: place.formattedAddress || current.storeAddress,
              storeLat:
                typeof lat === "number" && Number.isFinite(lat)
                  ? String(lat)
                  : current.storeLat,
              storeLng:
                typeof lng === "number" && Number.isFinite(lng)
                  ? String(lng)
                  : current.storeLng,
            }));
          }
        );

        autocompleteContainerRef.current.innerHTML = "";
        autocompleteContainerRef.current.appendChild(placeAutocomplete);
        autocompleteElementRef.current = placeAutocomplete;
        setPlacesError("");
      } catch {
        setPlacesError("Failed to load Google Places address search.");
      }
    };

    if (window.google?.maps?.importLibrary) {
      initializeAutocomplete();
      return () => {
        cancelled = true;
      };
    }

    let script = document.getElementById(GOOGLE_MAPS_SCRIPT_ID);

    const handleLoad = () => {
      initializeAutocomplete();
    };

    if (!script) {
      script = document.createElement("script");
      script.id = GOOGLE_MAPS_SCRIPT_ID;
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&loading=async&libraries=places&v=weekly`;
      script.async = true;
      script.defer = true;
      script.addEventListener("load", handleLoad);
      document.body.appendChild(script);
    } else {
      script.addEventListener("load", handleLoad);
    }

    return () => {
      cancelled = true;
      script?.removeEventListener("load", handleLoad);
    };
  }, [setStoreSettings]);

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
                <div style={{ display: "grid", gap: 10 }}>
                  {placesError ? (
                    <Alert type="warning" showIcon message={placesError} />
                  ) : null}
                  <div
                    ref={autocompleteContainerRef}
                    style={{ width: "100%", minHeight: 42 }}
                  />
                  <Input
                    prefix={<EnvironmentOutlined />}
                    value={storeSettings.storeAddress}
                    onChange={(e) =>
                      setStoreSettings((current) => ({
                        ...current,
                        storeAddress: e.target.value,
                      }))
                    }
                    placeholder="Selected address"
                  />
                </div>
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
                      showSearch
                      allowClear
                      optionFilterProp="label"
                      options={COUNTRY_OPTIONS}
                      value={storeSettings.storeCountry}
                      onChange={(value) =>
                        setStoreSettings((current) => ({
                          ...current,
                          storeCountry: value || "",
                          storeCurrency:
                            value && COUNTRY_TO_CURRENCY[value]
                              ? COUNTRY_TO_CURRENCY[value]
                              : current.storeCurrency,
                        }))
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
