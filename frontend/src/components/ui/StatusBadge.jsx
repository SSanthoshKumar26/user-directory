const StatusBadge = ({ status }) => {
    const isActive = status?.toLowerCase() === 'active';

    return (
        <span className={`status-pill ${isActive ? 'status-active' : 'status-inactive'}`}>
            <span className="status-pill-dot" />
            {status}
        </span>
    );
};

export default StatusBadge;
