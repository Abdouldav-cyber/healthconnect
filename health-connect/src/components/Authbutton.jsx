const AuthButton = ({ onPress, title, disabled }) => {
  return (
    <button
      onClick={onPress}
      disabled={disabled}
      style={{
        padding: '10px 20px',
        backgroundColor: disabled ? '#ccc' : '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '50%',
        cursor: disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {title}
    </button>
  );
}

export default AuthButton;