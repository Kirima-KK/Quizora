import '@testing-library/jest-dom';
import { act, fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react';
import { Login } from '@/app/_components/login';
import { useLoginSubmit } from '@/app/_hooks/useSubmit';

//Mock White Logo
jest.mock('@/app/_assets/icons/quizora-white.svg', () => ({
  __esModule: true,
  default: (props: any) => (<div data-testid="white-logo" {...props}>WhiteLogo</div>)
}));

//Mock Blue Logo
jest.mock('@/app/_assets/icons/quizora-blue.svg', () => ({
  __esModule: true,
  default: (props: any) => (<div data-testid="blue-logo" {...props}>BlueLogo</div>)
}));

//Mock useLoginSubmit hook
const mockSubmit = jest.fn();
jest.mock('@/app/_hooks/useSubmit', () => ({
  useLoginSubmit: jest.fn(),
}));

describe("Login Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useLoginSubmit as jest.Mock).mockReturnValue({
      isLoading: false,
      response: { type: '', message: '' },
      submit: jest.fn(),
    });
  });

  // test render elements
  it("renders info text", () => {
    render(<Login />);
    const infoText = "Used this info to try it yourself";
    expect(screen.getByText((content) => content.includes(infoText))).toBeInTheDocument();
  });

  it("renders login title", () => {
    render(<Login />);
    const loginTitle = "Login";
    expect(screen.getAllByText((content) => content.includes(loginTitle))[0]).toBeInTheDocument();
  });

  it("renders inputs and login button", () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  // test login form actions
  it("show error message when submitting an empty form", async () => {
    render(<Login />);
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    expect(await screen.findByText("Email is required.")).toBeInTheDocument();
    expect(await screen.findByText("Password is required.")).toBeInTheDocument();
  });

  it("show error message when submitting incorrect email format", async () => {
    render(<Login />);

    const emailInput = screen.getByLabelText(/email/i);

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: "invalid-email" } });
      fireEvent.blur(emailInput);
    });

    expect(await screen.getByText("Please enter a valid email address.")).toBeInTheDocument();
  });

  it("show error message for invalid password length", async () => {
    render(<Login />);

    const passwordInput = screen.getByLabelText(/password/i);

    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: "000" } });
      fireEvent.blur(passwordInput);
    });

    expect(await screen.getByText("Must be at least 6 characters")).toBeInTheDocument();
  });

  it("toggles password visibility", () => {
    render(<Login />);

    const toggleButton = screen.getByRole("button", { name: /show/i });
    const passwordInput = screen.getByLabelText(/password/i);

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleButton);

    expect(passwordInput).toHaveAttribute("type", "text");
    expect(screen.getByRole("button", { name: /hide/i })).toBeInTheDocument();
  });

  it("show error message when submitting incorrect credentials", async () => {
    (useLoginSubmit as jest.Mock).mockReturnValue({
      isLoading: false,
      response: { type: "error", message: "Email or password is incorrect." },
      submit: mockSubmit
    });

    render(<Login />);

    expect(screen.getByText((text) => text.includes("Email or password is incorrect."))).toBeInTheDocument();
  });

  it("submitting correct credentials", async () => {
    (useLoginSubmit as jest.Mock).mockReturnValue({
      isLoading: false,
      response: { type: "", message: "" },
      submit: mockSubmit,
    });

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "lunaDuck@gmail.com" }
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "lunaDuck123456" }
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        email: "lunaDuck@gmail.com",
        password: "lunaDuck123456"
      })
    });
  });
});