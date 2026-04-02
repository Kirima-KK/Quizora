import { fireEvent, render, screen } from "@testing-library/react";
import Landing from "@/app/_components/home/landing";
import '@testing-library/jest-dom'
import { useRouter } from 'next/navigation';

// Mock SVG logo
jest.mock('@/app/assets/icons/quizora-white.svg', () => ({
  __esModule: true,
  default: function MockLogo(props: any) {
    return <div data-testid='logo' {...props}>Logo</div>;
  },
}));

//Mock Link
jest.mock("next/link", () => {
  return ({ children, href }: any) => (
    <a href={href} data-testid="link">
      {children}
    </a>
  );
});

// Mock useRouter 
jest.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

describe("Landing Page", () => {
  it("renders the logo", () => {
    render(<Landing />);
    expect(screen.getByTestId("logo")).toBeInTheDocument();
  });

  it("link to /login", () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    render(<Landing />);
    fireEvent.click(screen.getByRole("button", { name: /login/i }));
    
    expect(mockPush).toHaveBeenCalledWith("/login");
    screen.getByRole("button", { name: /login/i })
  });
});