import Avatar from "@/app/_components/dashboard/profile/avatar";
import { fetchCurrentUser } from "@/app/_lib/users";
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />
}));

// Mock skeleton
jest.mock("@/app/_components/skeleton/avatar-skeleton", () => ({
  __esModule: true,
  default: () => <div data-testid="skeleton" />
}));

// Mock user data
jest.mock("@/app/_lib/users", () => ({
  fetchCurrentUser: jest.fn()
}));

describe("Avatar", () => {
  it("renders avatar", async () => {
    (fetchCurrentUser as jest.Mock).mockResolvedValue({
      name: "Test User",
      image: "/avatar.png",
      _id: "123"
    });
    const avatar = <Avatar />

    render(avatar);

    const avatarImage = await screen.findByAltText((text) => text.includes("avatar"));
    expect(avatarImage).toHaveAttribute('src', '/avatar.png');
  });
});