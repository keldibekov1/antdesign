import React, { FC } from "react";
import { Modal, Form, Input, Button, InputNumber } from "antd";
import type { FormProps } from "antd";
import { useCreateUserMutation, useUpdateUserMutation } from "../../redux/api/user.api";

type FieldType = {
  name?: string;
  surname?: string;
  email?: string;
  age?: number;
};

interface Props {
  updateUser?: any;
  isModalOpen?: boolean;
  handleCancel: () => void;
}

const ModalWrapper: FC<Props> = ({ isModalOpen, handleCancel, updateUser }) => {
  const [createUser, { isLoading }] = useCreateUserMutation();
  const [editUser, { isLoading: updateLoading }] = useUpdateUserMutation();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      if (updateUser) {
        await editUser({ id: updateUser.id, body: values }).unwrap();
      } else {
        await createUser(values).unwrap();
      }
      handleCancel();
    } catch (error) {
      console.error("Xatolik:", error);
    }
  };

  return (
    <Modal
      title={updateUser ? "Update User" : "Create User"}
      open={isModalOpen}
      onCancel={handleCancel}
      footer={false}
    >
      <Form
        name="userForm"
        initialValues={updateUser || {}}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Surname"
          name="surname"
          rules={[{ required: true, message: "Please input your surname!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Age"
          name="age"
          rules={[{ required: true, message: "Please input your age!" }]}
        >
          <InputNumber className="w-full" min={0} />
        </Form.Item>

       

        <Form.Item label={null}>
          <Button
            loading={isLoading || updateLoading}
            className="w-full"
            type="primary"
            htmlType="submit"
          >
            {updateUser ? "Update" : "Create"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default React.memo(ModalWrapper);
