type hideLogin = {
  hideLoginForm: () => void;
};

export default function Login({ hideLoginForm }: hideLogin) {
  const closePopup = () => {
    hideLoginForm();
  };

  return (
    <div className="login-container">
      <div
        className="background-overlay"
        onClick={closePopup}
        aria-hidden="true"
      >
        {" "}
      </div>
      <div className="login-form">
        <div className="form-heading">
          <h2>Phone Number Verification</h2>
        </div>
        <div className="form-body">
          <p>Enter your phone number to Login/Sign up</p>
          <div className="user-number-verification">
            <input type="tel" name="" id="" />
          </div>
          <button type="button">Next</button>
          <div className="terms-condition">
            <span>By continuing, you agree to our</span>
            <div className="terms-links">
              <a href="/">Terms of services</a>
              <a href="/">Privacy policy</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
