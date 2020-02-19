import React from "react";
import { Modal, Form, Input, Checkbox } from "antd";

class TaskModal extends React.Component {
    handleOk = () => {
        const { task, creating, onCreate, onEdit } = this.props;
        const { form } = this.props;

        form.validateFields((errors, values) => {
            if (!errors) {
                const taskFormFields = {
                    ...values,
                    codigo: task && task.codigo,
                    status: values.status ? "CONCLUIDO" : "EM_ANDAMENTO"
                };

                if (creating) {
                    onCreate(taskFormFields);
                } else {
                    onEdit(taskFormFields);
                }
            }
        });
    };

    render() {
        const {
            visible,
            creating,
            onCancel,
            task = {},
            form,
            loading
        } = this.props;
        const { getFieldDecorator } = form;
        return (
            <Modal
                title={`${creating ? "New" : "Edit"} Task`}
                visible={visible}
                confirmLoading={loading}
                onOk={this.handleOk}
                onCancel={onCancel}
                okText={creating ? "Create" : "Save"}
                destroyOnClose
            >
                <Form layout="vertical">
                    <Form.Item label="Title">
                        {getFieldDecorator("titulo", {
                            initialValue: task.titulo,
                            rules: [
                                {
                                    required: true,
                                    message: "Title is required"
                                },
                                {
                                    min: 3,
                                    message: "Must have at least 3 characters"
                                }
                            ]
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="Description">
                        {getFieldDecorator("descricao", {
                            initialValue: task.descricao
                        })(<Input type="textarea" />)}
                    </Form.Item>
                    <Form.Item extra="Task already finished?">
                        {getFieldDecorator("status", {
                            valuePropName: "checked",
                            initialValue: task.status === "CONCLUIDO"
                        })(<Checkbox>Finished</Checkbox>)}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }
}

export default Form.create({ name: "task_modal" })(TaskModal);
