import { render } from "@testing-library/react";
import MainPanel from "./MainPanel";

const renderMainPanel = (props: Partial<any> = {}) => {
    const defaultProps = {
        selectedPokemon: undefined,
        goToNext() {
            return;
        },
        goToPrevious() {
            return;
        },
        on: false,
        onPowerPressed () {},
    };

    return render(<MainPanel {...defaultProps} {...props}/>);
}

describe("<MainPanel />", () => {
    test("should be turned off", async () => {
        const element = renderMainPanel();
        expect(element.container.getElementsByClassName("screen off").length).toBe(1);
        expect(element.container.getElementsByClassName("screen on").length).toBe(0);
    });
    test("should be turned off", async () => {
        const element = renderMainPanel({on:true});
        expect(element.container.getElementsByClassName("screen off").length).toBe(0);
        expect(element.container.getElementsByClassName("screen on").length).toBe(1);
    });

});