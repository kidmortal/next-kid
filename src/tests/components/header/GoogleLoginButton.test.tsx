import { fireEvent, render, screen } from "@testing-library/react";
import { signIn, signOut, SignOutResponse, useSession } from "next-auth/client";
import { mocked } from "ts-jest/dist/utils/testing";
import { GoogleLoginButton } from "../../../components/header/GoogleLoginButton";
import { Profile } from "../../../components/header/Profile";

jest.mock("next-auth/client");
const useSessionMocked = mocked(useSession);

describe("Profile Avatar", () => {
  test('Should be written "Sem usuario" when not logged in', () => {
    useSessionMocked.mockReturnValueOnce([null, false]);
    const { getByText } = render(<Profile />);
    expect(getByText("Sem Usuario")).toBeInTheDocument();
  });

  test("Should be written the user name when logged in", () => {
    useSessionMocked.mockReturnValueOnce([
      { user: { name: "John doe" } },
      false,
    ]);
    const { getByText } = render(<Profile />);
    expect(getByText("John doe")).toBeInTheDocument();
  });
});

describe("Google Signin Button", () => {
  test('Should be written "Sign In" when user isnt signed in', () => {
    useSessionMocked.mockReturnValueOnce([null, false]);
    const { getByText } = render(<GoogleLoginButton />);
    expect(getByText("Sign In")).toBeInTheDocument();
  });
  test('Should be written "Sign Out" when user is already singed in', () => {
    useSessionMocked.mockReturnValueOnce([
      { user: { name: "John doe" } },
      false,
    ]);
    const { getByText } = render(<GoogleLoginButton />);
    expect(getByText("Sign Out")).toBeInTheDocument();
  });
  test('Should call "Sign in" function when clicked while not logged in', () => {
    useSessionMocked.mockReturnValueOnce([null, false]);
    const signInMocked = mocked(signIn);
    signInMocked.mockReturnValueOnce(() => {});
    render(<GoogleLoginButton />);
    const loginButton = screen.getByText("Sign In");
    fireEvent.click(loginButton);
    expect(signInMocked).toBeCalled();
  });
  test('Should call "Sign Out" function when clicked while logged in', () => {
    useSessionMocked.mockReturnValueOnce([
      { user: { name: "John doe" } },
      false,
    ]);
    const signOutMocked = mocked(signOut);
    render(<GoogleLoginButton />);
    const loginButton = screen.getByText("Sign Out");
    fireEvent.click(loginButton);
    expect(signOutMocked).toBeCalled();
  });
});
