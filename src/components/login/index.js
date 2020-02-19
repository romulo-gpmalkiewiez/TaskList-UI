import React from 'react';
import { Card, Form, Icon, Input, Button, Checkbox, Alert } from 'antd';
import './index.less';

class Login extends React.Component {
    state = {
        loading: false,
        error: undefined,
    };

    handleSubmit = e => {
        e.preventDefault();
        this.setState({ hasError: false });

        const { onLogin, redirectTo, form } = this.props;

        form.validateFields((err, values) => {
            if (!err) {
                console.log('Logging in...');
                this.setState({ loading: true }, async () => {

                    try {
                        await onLogin(values);
                        console.log('Successfully logged in!');
                        window.location.href = redirectTo;

                    } catch (response) {
                        console.log('Error', response);
                        this.setState({ error: response.error });
                    }

                    this.setState({ loading: false });
                });
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        const { error, loading } = this.state;
        const { title } = this.props;
        return (
            <Card className="login-form-card" title={title}>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    {error && (
                        <Form.Item>
                            <Alert
                                description={error}
                                type="error"
                                showIcon
                                closable
                                onClose={() => this.setState({ error: undefined })}
                            />
                        </Form.Item>
                    )}
                    <Form.Item>
                        {getFieldDecorator('username', {
                            initialValue: 'admin',
                            rules: [{ required: true, message: 'Please input your Username!' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            initialValue: 'admin',
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox className="login-form-remember-me">Remember me</Checkbox>)}
                        <a className="login-form-forgot" href="/#">
                            Forgot password
                        </a>
                        <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                            Login
                        </Button>
                        <div className="login-form-register-now">Or <a href="/#">register now!</a></div>
                    </Form.Item>
                </Form>
            </Card>
        );
    }
}

const LoginForm = Form.create({ name: 'login_form' })(Login);

export default LoginForm;
