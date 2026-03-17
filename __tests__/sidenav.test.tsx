import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SideNav from "@/app/_components/dashboard/sidenav/sidenav";
import '@testing-library/jest-dom'
import { useLogout } from "@/app/hooks/useSubmit";
import NavLinks from "@/app/_components/dashboard/sidenav/nav-links";

//Mock next/link
jest.mock("next/link", () => {
  return ({ children, href }: any) => (
    <a href={href} data-testid="link">
      {children}
    </a>
  );
});

// Mock next/Image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} data-testid='logo-image' />
  }
}));

// Mock router ans usePathname
jest.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => "",
}));

// Mock icons
jest.mock('@/app/assets/icons/ic_round-space-dashboard.svg', () => ({
  __esModule: true,
  default: (props: any) => <div data-testid='dashboard-icon' {...props}>Dashboard Icon</div>
}));

jest.mock('@/app/assets/icons/ic_twotone-history.svg', () => ({
  __esModule: true,
  default: (props: any) => <div data-testid='history-icon' {...props}>History Icon</div>
}));

// Mock logout icon
jest.mock("@/app/assets/icons/ri_logout-box-fill.svg", () => ({
  __esModule: true,
  default: () => <svg data-testid="logout-icon" />,
}));

// Mock useLogout
jest.mock("@/app/hooks/useSubmit", () => ({
  useLogout: jest.fn(),
}));

describe("Side Navigation Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (useLogout as jest.Mock).mockReturnValue({
      isLoading: false,
      response: { type: '', message: '' },
      logout: jest.fn(),
    });
  });

  // Test renders

  it('renders link to / from logo', () => {
    render(<SideNav />);
    const links = screen.getAllByTestId('link');
    const link = links.find(link => link.getAttribute('href') === '/');
    const hrefs = links.map(link => link.getAttribute('href'));

    expect(hrefs).toContain('/');

    expect(link).toContainElement(
      screen.getByTestId("logo-image")
    );
  });

  it('render logout button', () => {
    render(<SideNav />);
    const logoutButton = screen.getByRole("button", { name: /log out/i });
    expect(logoutButton).toBeInTheDocument();
  });

  // Test functionality

  it("logout", async () => {
    const mockLogout = jest.fn();
    (useLogout as jest.Mock).mockReturnValue({
      isLoading: false,
      response: { type: '', message: '' },
      logout: mockLogout,
    });

    render(<SideNav />);

    fireEvent.click(screen.getByText("Log Out"));

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalled();
    });
  });

  it("link to each urls", () => {
    render(<NavLinks />);
    const links = screen.getAllByTestId('link');
    const hrefs = links.map(link => link.getAttribute('href'));

    expect(hrefs).toContain('/dashboard');
    expect(hrefs).toContain('/dashboard/quiz-history');
  });
});
