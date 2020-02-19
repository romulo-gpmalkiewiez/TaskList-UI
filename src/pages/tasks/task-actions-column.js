import React from "react";
import { Button } from "antd";

import "./task-actions-column.less";

function TaskActionsColumn({ loading, task, onConclude, onEdit, onDelete }) {
    function isTaskInProgress() {
        return task.status !== "CONCLUIDO";
    }

    return (
        <div className="task-actions-column-wrapper">
            {isTaskInProgress() && (
                <Button
                    className="action-btn"
                    disabled={loading}
                    type="link"
                    shape="circle"
                    icon="check"
                    title="Conclude Task"
                    onClick={() => onConclude(task)}
                />
            )}
            <Button
                className="action-btn"
                disabled={loading}
                type="link"
                shape="circle"
                icon="edit"
                title="Edit Task"
                onClick={() => onEdit(task)}
            />
            <Button
                className="action-btn"
                disabled={loading}
                type="link"
                shape="circle"
                icon="delete"
                title="Delete Task"
                onClick={() => onDelete(task)}
            />
        </div>
    );
}

export default TaskActionsColumn;
