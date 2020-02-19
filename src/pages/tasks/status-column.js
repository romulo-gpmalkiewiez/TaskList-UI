import React from "react";
import { Badge } from "antd";

function getBadgeStatus(status) {
    return status === "CONCLUIDO" ? "success" : "warning";
}

function getStatusText(status) {
    return status === "CONCLUIDO" ? "Finished" : "In Progress";
}

function StatusColumn({ status }) {
    return (
        <span>
            <Badge status={getBadgeStatus(status)} />
            {getStatusText(status)}
        </span>
    );
}

export default StatusColumn;
