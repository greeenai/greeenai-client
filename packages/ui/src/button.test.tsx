import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "./button.tsx";

describe("Button Component", () => {
  test("renders button with correct text", () => {
    render(<Button appName="TestApp">Click Me</Button>);
    const button = screen.getByText("Click Me");
    expect(button).toBeInTheDocument(); // JSX 렌더링 확인
  });

  test("applies the provided className", () => {
    render(
      <Button appName="TestApp" className="custom-class">
        Click Me
      </Button>
    );
    const button = screen.getByText("Click Me");
    expect(button).toHaveClass("custom-class"); // className 속성 확인
  });

  test("alerts with the correct message on click", () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(); // alert 모의 함수 생성
    render(<Button appName="TestApp">Click Me</Button>);
    const button = screen.getByText("Click Me");

    fireEvent.click(button); // 버튼 클릭 이벤트 트리거
    expect(alertMock).toHaveBeenCalledWith("Hello from your TestApp app!"); // alert 호출 확인

    alertMock.mockRestore(); // mock 복원
  });

  test("handles JSX children correctly", () => {
    render(
      <Button appName="TestApp">
        <span>Child Element</span>
      </Button>
    );
    const childElement = screen.getByText("Child Element");
    expect(childElement).toBeInTheDocument(); // JSX 자식 렌더링 확인
  });
});
