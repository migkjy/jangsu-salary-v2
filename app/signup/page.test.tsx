import { fireEvent, render, screen } from "@testing-library/react"
import { useRouter } from "next/navigation"
import SignupPage from "./page"

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}))

describe("SignupPage", () => {
  beforeEach(() => {
    ;(useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
    })
  })

  it("renders signup form", () => {
    render(<SignupPage />)

    expect(screen.getByText("회원가입")).toBeInTheDocument()
    expect(screen.getByLabelText("이름")).toBeInTheDocument()
    expect(screen.getByLabelText("이메일")).toBeInTheDocument()
    expect(screen.getByLabelText("비밀번호")).toBeInTheDocument()
    expect(screen.getByLabelText("비밀번호 확인")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "회원가입" })).toBeInTheDocument()
  })

  it("updates form values on input change", () => {
    render(<SignupPage />)

    const nameInput = screen.getByLabelText("이름")
    const emailInput = screen.getByLabelText("이메일")
    const passwordInput = screen.getByLabelText("비밀번호")
    const confirmPasswordInput = screen.getByLabelText("비밀번호 확인")

    fireEvent.change(nameInput, { target: { value: "홍길동" } })
    fireEvent.change(emailInput, { target: { value: "test@example.com" } })
    fireEvent.change(passwordInput, { target: { value: "password123" } })
    fireEvent.change(confirmPasswordInput, { target: { value: "password123" } })

    expect(nameInput).toHaveValue("홍길동")
    expect(emailInput).toHaveValue("test@example.com")
    expect(passwordInput).toHaveValue("password123")
    expect(confirmPasswordInput).toHaveValue("password123")
  })

  it("shows login link", () => {
    render(<SignupPage />)

    const loginLink = screen.getByText("로그인")
    expect(loginLink).toBeInTheDocument()
    expect(loginLink.getAttribute("href")).toBe("/login")
  })
})
