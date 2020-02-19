import React from "react";
import { Modal, Table, Button, message } from "antd";

import SystemLayout from "../../components/layout";
import API from "../../utils/api";

import TaskActionsColumn from "./task-actions-column";
import StatusColumn from "./status-column";
import TaskModal from "./modal";
import "./index.less";

class TasksPage extends React.Component {
    state = {
        loading: true,
        creating: false,
        editing: false,
        taskSelected: undefined,
        taskList: []
    };

    componentDidMount() {
        this.fetchTasks();
    }

    fetchTasks() {
        this.setState({ loading: true }, () => {
            API.get("/tasks")
                .then(response =>
                    this.setState({
                        taskList: this.taskListToTableData(response.data)
                    })
                )
                .catch(reason => message.error(reason.message))
                .finally(() => this.setState({ loading: false }));
        });
    }

    taskListToTableData(data) {
        return data.map(row => ({ key: row.codigo, ...row }));
    }

    handleCreateTask = task => {
        this.setState({ loading: true }, () => {
            API.post(`/tasks`, task)
                .then(_response => this.fetchTasks())
                .catch(reason => message.error(reason.message))
                .finally(() =>
                    this.setState({ loading: false, creating: false })
                );
        });
    };

    handleEditTask = task => {
        const { codigo, ...taskBody } = task;
        this.setState({ loading: true }, () => {
            API.put(`/tasks/${codigo}`, taskBody)
                .then(_response => this.fetchTasks())
                .catch(reason => message.error(reason.message))
                .finally(() =>
                    this.setState({ loading: false, editing: false })
                );
        });
    };

    handleDeleteTask = ({ codigo }) => {
        this.setState({ loading: true }, () => {
            API.delete(`/tasks/${codigo}`)
                .then(_response => this.fetchTasks())
                .catch(reason => message.error(reason.message))
                .finally(() => this.setState({ loading: false }));
        });
    };

    handleConcludeTask = ({ codigo }) => {
        this.setState({ loading: true }, () => {
            API.patch(`/tasks/${codigo}/concluido`)
                .then(_response => this.fetchTasks())
                .catch(reason => message.error(reason.message))
                .finally(() => this.setState({ loading: false }));
        });
    };

    showDeleteConfirm(onOk) {
        Modal.confirm({
            title: "Are you sure delete this task?",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk
        });
    }

    handleOpenCreateTaskModal = () => {
        this.setState({ creating: true, taskSelected: undefined });
    };

    handleOpenEditTaskModal = editingTask => {
        this.setState({ editing: true, taskSelected: editingTask });
    };

    handleCloseModal = () => {
        this.setState({ creating: false, editing: false });
    };

    render() {
        const {
            loading,
            creating,
            editing,
            taskSelected,
            taskList
        } = this.state;
        const modalVisible = creating || editing;

        return (
            <SystemLayout>
                <div className="task-table-header-actions">
                    <Button
                        type="primary"
                        icon="plus"
                        onClick={this.handleOpenCreateTaskModal}
                    >
                        Task
                    </Button>
                </div>

                <Table dataSource={taskList}>
                    <Table.Column
                        title="Title"
                        dataIndex="titulo"
                        key="titulo"
                    />
                    <Table.Column
                        title="Description"
                        dataIndex="descricao"
                        key="descricao"
                    />
                    <Table.Column
                        title="Status"
                        dataIndex="status"
                        key="status"
                        render={status => <StatusColumn status={status} />}
                    />
                    <Table.Column
                        title=""
                        key="action"
                        render={(_text, task) => (
                            <TaskActionsColumn
                                loading={loading}
                                task={task}
                                onEdit={this.handleOpenEditTaskModal}
                                onDelete={() =>
                                    this.showDeleteConfirm(() =>
                                        this.handleDeleteTask(task)
                                    )
                                }
                                onConclude={this.handleConcludeTask}
                            />
                        )}
                    />
                </Table>

                <TaskModal
                    loading={loading}
                    task={taskSelected}
                    visible={modalVisible}
                    creating={creating}
                    editing={editing}
                    onEdit={this.handleEditTask}
                    onCreate={this.handleCreateTask}
                    onCancel={this.handleCloseModal}
                />
            </SystemLayout>
        );
    }
}

export default TasksPage;
