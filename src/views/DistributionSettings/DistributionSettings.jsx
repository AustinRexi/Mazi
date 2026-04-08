import { useEffect, useState } from "react";
import { Alert, Button, Card, Form, InputNumber, message } from "antd";
import {
  fetchDistributionSettings,
  updateDistributionSettings,
} from "../../services/adminDistributionSettingService";

function DistributionSettings() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadSettings = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchDistributionSettings();
        if (!mounted) {
          return;
        }

        form.setFieldsValue({
          buyer_percentage: Number(data?.buyer_percentage || 0),
          courier_percentage: Number(data?.courier_percentage || 0),
          company_percentage: Number(data?.company_percentage || 0),
          referral_percentage: Number(data?.referral_percentage || 0),
          withdrawal_threshold: Number(data?.withdrawal_threshold || 0),
        });
      } catch (requestError) {
        if (!mounted) {
          return;
        }

        setError(
          requestError?.response?.data?.message ||
            requestError?.message ||
            "Failed to load distribution settings."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadSettings();
    return () => {
      mounted = false;
    };
  }, [form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setSaving(true);

      await updateDistributionSettings(values);
      message.success("Distribution settings updated successfully.");
    } catch (requestError) {
      if (requestError?.errorFields) {
        return;
      }

      message.error(
        requestError?.response?.data?.message ||
          requestError?.message ||
          "Failed to update distribution settings."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ padding: 16 }}>
      <h2 style={{ marginTop: 0 }}>Distribution Settings</h2>
      {error ? <Alert type="error" showIcon message={error} style={{ marginBottom: 12 }} /> : null}

      <Card loading={loading}>
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Buyer Percentage"
            name="buyer_percentage"
            rules={[{ required: true, message: "Buyer percentage is required." }]}
          >
            <InputNumber min={0} step={0.01} precision={2} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Courier Percentage"
            name="courier_percentage"
            rules={[{ required: true, message: "Courier percentage is required." }]}
          >
            <InputNumber min={0} step={0.01} precision={2} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Company Percentage"
            name="company_percentage"
            rules={[{ required: true, message: "Company percentage is required." }]}
          >
            <InputNumber min={0} step={0.01} precision={2} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Referral Percentage"
            name="referral_percentage"
            rules={[{ required: true, message: "Referral percentage is required." }]}
          >
            <InputNumber min={0} step={0.01} precision={2} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Withdrawal Threshold"
            name="withdrawal_threshold"
            rules={[{ required: true, message: "Withdrawal threshold is required." }]}
          >
            <InputNumber min={0} step={0.01} precision={2} style={{ width: "100%" }} />
          </Form.Item>

          <Button type="primary" loading={saving} onClick={handleSubmit}>
            Save
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default DistributionSettings;
