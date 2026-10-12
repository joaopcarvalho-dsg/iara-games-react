function InputField({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  autoComplete,
  required = false,
  status,       // 'error' | 'success' | null
  feedback,     // mensagem de feedback
  children,     // slot extra abaixo do input (ex: "Esqueci minha senha")
}) {
  const inputClass = [
    status === 'error' ? 'input-error' : '',
    status === 'success' ? 'input-success' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
        required={required}
        aria-required={required}
        className={inputClass}
      />
      {feedback && (
        <span className={`field-feedback ${status === 'error' ? 'field-error' : 'field-success'}`}>
          {feedback}
        </span>
      )}
      {children}
    </div>
  )
}

export default InputField
