import {fireEvent, render, waitFor} from "@testing-library/react";
import pokedexService from "../services/PokedexService";
import Pokedex from "./Pokedex";

const renderPokedex = (props: Partial<any> = {}) => {
    const defaultProps = {
    };

    return render(<Pokedex {...defaultProps} {...props}/>);
}

describe("<Pokedex />", () => {
    test("should start closed", async () => {
        const element = renderPokedex();
        expect(element.container.getElementsByClassName("cover").length).toBe(1);
    });

    test("should open cover", async () => {
        const element = renderPokedex();
        fireEvent.click(element.container.getElementsByClassName("arrow-right-border")[0]);
        expect(element.container.getElementsByClassName("cover").length).toBe(0);
        expect(element.container.getElementsByClassName("selector-panel-wrapper").length).toBe(1);
        expect(element.container.getElementsByClassName("screen-container").length).toBe(1);
    });

    test("should start off", async () => {
        const element = renderPokedex();
        fireEvent.click(element.container.getElementsByClassName("arrow-right-border")[0]);
        expect(element.container.getElementsByClassName("screen off").length).toBe(1);
        expect(element.container.getElementsByClassName("dex-display gray large")[0].textContent).toBe("");
    });

    test("should turn on", async () => {
        const element = renderPokedex();
        fireEvent.click(element.container.getElementsByClassName("arrow-right-border")[0]);
        fireEvent.click(element.container.getElementsByClassName("rounded")[0]);
        expect(element.container.getElementsByClassName("screen on").length).toBe(1);
        expect(element.container.getElementsByClassName("dex-display gray large")[0].textContent).toBe("___");
    });

    test("turn on turn off switch should reset state", async () => {
        const element = renderPokedex();
        fireEvent.click(element.container.getElementsByClassName("arrow-right-border")[0]);
        fireEvent.click(element.container.getElementsByClassName("rounded")[0]);
        expect(element.container.getElementsByClassName("screen on").length).toBe(1);
        fireEvent.click(element.getAllByText("1")[0]);
        expect(element.container.getElementsByClassName("dex-display gray large")[0].textContent).toBe("__1");
        fireEvent.click(element.container.getElementsByClassName("poke-button square green")[0]);
        fireEvent.click(element.container.getElementsByClassName("rounded")[0]);
        expect(element.container.getElementsByClassName("screen off").length).toBe(1);
        fireEvent.click(element.container.getElementsByClassName("rounded")[0]);
        expect(element.container.getElementsByClassName("screen on").length).toBe(1);
        expect(element.container.getElementsByClassName("dex-display gray large")[0].textContent).toBe("___");
    })

    test("should turn on", async () => {
        const pokemon = {
            number: 1,
            name: 'Bulbassaur',
            image: ''
        }
        const mock = jest.spyOn(pokedexService, 'fetchPokemonById');
        mock.mockResolvedValue(pokemon);

        const element = renderPokedex();
        fireEvent.click(element.container.getElementsByClassName("arrow-right-border")[0]);
        fireEvent.click(element.container.getElementsByClassName("rounded")[0]);
        fireEvent.click(element.getAllByText("1")[0]);
        fireEvent.click(element.container.getElementsByClassName("poke-button square green")[0]);
        expect(mock).toBeCalledTimes(1);
        await waitFor(() => {
            expect(element.container.getElementsByClassName("pokemon-view")[0].textContent).toBe('Bulbassaur');
        });
    });
});