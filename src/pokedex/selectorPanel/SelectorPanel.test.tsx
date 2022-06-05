import SelectorPanel from "./SelectorPanel";
import { fireEvent, render } from "@testing-library/react";

const renderSelector = (props: Partial<any> = {}) => {
    const defaultProps = {
        onClose() {
            return;
        },
        onConfirm() {
            return;
        },
        on: true,
        selectedPokemonId: undefined,
    };

    return render(<SelectorPanel {...defaultProps} {...props}/>);
}

describe("<SelectorPanel />", () => {
    test("should display nothing", async () => {
        const element = renderSelector({on:false});
        expect(element.container.getElementsByClassName("dex-display")[0].textContent).toBe("");
    });

    test("should display clicked numbers", async () => {
        const element = renderSelector({on:false});
        fireEvent.click(element.getAllByText("1")[0]);
        expect(element.container.getElementsByClassName("dex-display")[0].textContent).toBe("");
    });

    test("should display empty id", async () => {
        const element = renderSelector();
        expect(element.container.getElementsByClassName("dex-display")[0].textContent).toBe("___");
    });

    test("should display clicked numbers", async () => {
        const element = renderSelector();
        fireEvent.click(element.getAllByText("1")[0]);
        expect(element.container.getElementsByClassName("dex-display")[0].textContent).toBe("__1");
        fireEvent.click(element.getAllByText("2")[0]);
        expect(element.container.getElementsByClassName("dex-display")[0].textContent).toBe("_12");
        fireEvent.click(element.getAllByText("3")[0]);
        expect(element.container.getElementsByClassName("dex-display")[0].textContent).toBe("123");
    });

    test("should display passed id on props", async () => {
        const element = renderSelector({selectedPokemonId: 23});
        expect(element.container.getElementsByClassName("dex-display")[0].textContent).toBe("_23");
    });

    test("should reset text fater pressing yellow", async () => {
        const element = renderSelector({selectedPokemonId: 23});
        expect(element.container.getElementsByClassName("dex-display")[0].textContent).toBe("_23");
        fireEvent.click(element.container.getElementsByClassName("yellow")[0]);
        expect(element.container.getElementsByClassName("dex-display")[0].textContent).toBe("___");
    });

    test("should call onConfirm whem pressing green", async () => {
        const onConfirm = jest.fn();
        const element = renderSelector({selectedPokemonId: 23, onConfirm});
        expect(element.container.getElementsByClassName("dex-display")[0].textContent).toBe("_23");
        fireEvent.click(element.container.getElementsByClassName("green")[0]);
        expect(onConfirm).toHaveBeenCalledTimes(1);
        expect(onConfirm).toHaveBeenCalledWith(23);
    });

    test("should reset display after clicking green and then another number", async () => {
        const element = renderSelector({selectedPokemonId: 23});
        expect(element.container.getElementsByClassName("dex-display")[0].textContent).toBe("_23");
        fireEvent.click(element.container.getElementsByClassName("green")[0]);
        fireEvent.click(element.getAllByText("1")[0]);
        expect(element.container.getElementsByClassName("dex-display")[0].textContent).toBe("__1");
    });

    test("should call with no parameters if is empty", async () => {
        const onConfirm = jest.fn();
        const element = renderSelector({onConfirm});
        expect(element.container.getElementsByClassName("dex-display")[0].textContent).toBe("___");
        fireEvent.click(element.container.getElementsByClassName("green")[0]);
        expect(element.container.getElementsByClassName("dex-display")[0].textContent).toBe("___");
        expect(onConfirm).toHaveBeenCalledTimes(1);
        expect(onConfirm).toHaveBeenCalledWith();
    });

    test("should validate if it is non zero value", async () => {
        const onConfirm = jest.fn();
        const element = renderSelector({onConfirm, selectedPokemonId: 0});
        expect(element.container.getElementsByClassName("dex-display")[0].textContent).toBe("__0");
        fireEvent.click(element.container.getElementsByClassName("green")[0]);
        expect(element.container.getElementsByClassName("dex-display")[0].textContent).toBe("___");
        expect(onConfirm).not.toBeCalled();
    });

});