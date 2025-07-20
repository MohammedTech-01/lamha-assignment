import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Button,
  message,
  Row,
  Col,
  Space,
} from "antd";
import dayjs from "dayjs";
import {
  validateAmount,
  validateInvoiceNumber,
  validateVendorName,
} from "../utils/validation";

/**
 * Form data interface
 */
interface FormData {
  date: string;
  type: string;
  vendor: string;
  amount: number;
  invoiceNumber: string;
  member: string;
  budget: string;
  status?: string;
  description?: string;
}

/**
 * Props interface for TransactionForm component
 */
interface TransactionFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
  initialData?: FormData;
  mode?: "create" | "edit";
}

/**
 * TransactionForm Component
 *
 * A form modal for creating or editing financial transactions.
 * Features validation, responsive layout, and clean error handling.
 *
 * @param {TransactionFormProps} props - Component props
 * @param {boolean} props.visible - Controls modal visibility
 * @param {Function} props.onClose - Callback when form is closed
 * @param {Function} props.onSubmit - Callback when form is submitted
 * @param {FormData} props.initialData - Initial form values for edit mode
 * @param {string} props.mode - Form mode ('create' or 'edit')
 */
const TransactionForm: React.FC<TransactionFormProps> = ({
  visible,
  onClose,
  onSubmit,
  initialData,
  mode = "create",
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  /**
   * Handle form submission
   * Formats data and calls parent submit function
   */
  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);

      // Format the data
      const formData: FormData = {
        ...values,
        date: values.date.format("YYYY-MM-DD"),
        amount: Number(values.amount),
        status: mode === "create" ? "Pending" : values.status,
      };

      // Call parent submit function
      await onSubmit(formData);

      // Success message
      message.success(
        `Transaction ${mode === "create" ? "created" : "updated"} successfully!`,
      );

      // Reset form and close
      form.resetFields();
      onClose();
    } catch (error) {
      message.error("Failed to save transaction");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle modal close
   * Resets form before closing
   */
  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      title={mode === "create" ? "Create New Transaction" : "Edit Transaction"}
      open={visible}
      onCancel={handleClose}
      footer={null}
      width={700}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          type: "Expense",
          budget: "General",
          ...initialData,
          date: initialData?.date ? dayjs(initialData.date) : dayjs(),
        }}
      >
        {/* Date and Type Row */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="date"
              label="Date"
              rules={[
                { required: true, message: "Please select date" },
                {
                  validator: (_, value) => {
                    if (value && value.isAfter(dayjs())) {
                      return Promise.reject("Date cannot be in the future");
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                format="YYYY-MM-DD"
                disabledDate={(current) => current && current > dayjs()}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="type"
              label="Type"
              rules={[{ required: true, message: "Please select type" }]}
            >
              <Select>
                <Select.Option value="Expense">Expense</Select.Option>
                <Select.Option value="Software">Software</Select.Option>
                <Select.Option value="Hardware">Hardware</Select.Option>
                <Select.Option value="Service">Service</Select.Option>
                <Select.Option value="Manual">Manual</Select.Option>
                <Select.Option value="Other">Other</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Vendor and Amount Row */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="vendor"
              label="Vendor"
              rules={[
                { required: true, message: "Please enter vendor name" },
                {
                  validator: (_, value) => {
                    if (!value) return Promise.resolve();
                    const result = validateVendorName(value);
                    return result.isValid
                      ? Promise.resolve()
                      : Promise.reject(result.error);
                  },
                },
              ]}
            >
              <Input placeholder="e.g., Amazon Web" maxLength={100} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="amount"
              label="Amount (SAR)"
              rules={[
                { required: true, message: "Please enter amount" },
                {
                  validator: (_, value) => {
                    if (value === undefined || value === null)
                      return Promise.resolve();
                    const result = validateAmount(value);
                    return result.isValid
                      ? Promise.resolve()
                      : Promise.reject(result.error);
                  },
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="0.00"
                min={0}
                max={1000000}
                precision={2}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Invoice Number and Member Row */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="invoiceNumber"
              label="Invoice Number"
              rules={[
                { required: true, message: "Please enter invoice number" },
                {
                  validator: (_, value) => {
                    if (!value) return Promise.resolve();
                    const result = validateInvoiceNumber(value);
                    return result.isValid
                      ? Promise.resolve()
                      : Promise.reject(result.error);
                  },
                },
              ]}
            >
              <Input placeholder="e.g., SA-232322" maxLength={50} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="member"
              label="Team Member"
              rules={[{ required: true, message: "Please select team member" }]}
            >
              <Select showSearch placeholder="Select member">
                <Select.Option value="Ahmed Abbas">Ahmed Abbas</Select.Option>
                <Select.Option value="Saad Ahmed">Saad Ahmed</Select.Option>
                <Select.Option value="Mohammed Ali">Mohammed Ali</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        {/* Budget and Status Row */}
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="budget"
              label="Budget Category"
              rules={[{ required: true, message: "Please select budget" }]}
            >
              <Select>
                <Select.Option value="General">General</Select.Option>
                <Select.Option value="Marketing">Marketing</Select.Option>
                <Select.Option value="IT">IT</Select.Option>
                <Select.Option value="Office">Office</Select.Option>
                <Select.Option value="Operations">Operations</Select.Option>
                <Select.Option value="HR">Human Resources</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          {/* Status field only shown in edit mode */}
          {mode === "edit" && (
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: "Please select status" }]}
              >
                <Select>
                  <Select.Option value="Pending">Pending</Select.Option>
                  <Select.Option value="Approved">Approved</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          )}
        </Row>

        {/* Form Actions */}
        <Form.Item>
          <Space style={{ width: "100%", justifyContent: "flex-end" }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{ backgroundColor: "#14b8a6" }}
            >
              {mode === "create" ? "Create" : "Update"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TransactionForm;
