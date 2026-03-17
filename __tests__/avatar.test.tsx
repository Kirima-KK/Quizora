import Avatar from "@/app/_components/dashboard/profile/avatar";
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />
}));

describe("Avatar", () => {
  it("renders avatar", () => {
    const avatar = <Avatar user={{
      _id: "test",
      firstName: "Luna",
      lastName: "Duck",
      image: "/avatar.png",
    }} />

    render(avatar);

    const avatarImage = screen.getByAltText((text) => text.includes("avatar"));
    expect(avatarImage).toHaveAttribute('src', '/avatar.png');
  });
});