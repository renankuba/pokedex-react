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
            number: 25,
            name: 'Pikachu',
            image: ''
        };
        const mock = jest.spyOn(pokedexService, 'fetchPokemonById');
        mock.mockResolvedValue(pokemon);

        const element = renderPokedex();
        fireEvent.click(element.container.getElementsByClassName("arrow-right-border")[0]);
        fireEvent.click(element.container.getElementsByClassName("rounded")[0]);
        fireEvent.click(element.getAllByText("2")[0]);
        fireEvent.click(element.getAllByText("5")[0]);
        fireEvent.click(element.container.getElementsByClassName("poke-button square green")[0]);
        expect(mock).toBeCalledTimes(1);
        await waitFor(() => {
            expect(element.container.getElementsByClassName("pokemon-view")[0].textContent).toBe('Pikachu');
        });
    });
    
    test("should go to next", async () => {
        const pokemon = {
            number: 25,
            name: 'Pikachu',
            image: ''
        };
        const nextPokemon = {
            number: 26,
            name: 'Raichu',
            image: ''
        };
        const mock = jest.spyOn(pokedexService, 'fetchPokemonById');
        mock.mockResolvedValueOnce(pokemon);
        mock.mockResolvedValueOnce(nextPokemon);

        const element = renderPokedex();
        fireEvent.click(element.container.getElementsByClassName("arrow-right-border")[0]);
        fireEvent.click(element.container.getElementsByClassName("rounded")[0]);
        fireEvent.click(element.getAllByText("2")[0]);
        fireEvent.click(element.getAllByText("5")[0]);
        fireEvent.click(element.container.getElementsByClassName("poke-button square green")[0]);
        await waitFor(() => {
            expect(element.container.getElementsByClassName("pokemon-view")[0].textContent).toBe('Pikachu');
        });
        fireEvent.click(element.container.getElementsByClassName("right")[0]);
        await waitFor(() => {
            expect(element.container.getElementsByClassName("pokemon-view")[0].textContent).toBe('Raichu');
            expect(mock).toBeCalledTimes(2);
            expect(mock).toHaveBeenNthCalledWith(2, 26);
        });
    });

    test("should go to previous", async () => {
        const pokemon = {
            number: 25,
            name: 'Pikachu',
            image: ''
        };
        const previousPokemon = {
            number: 24,
            name: 'Arbok',
            image: ''
        };
        const mock = jest.spyOn(pokedexService, 'fetchPokemonById');
        mock.mockResolvedValueOnce(pokemon);
        mock.mockResolvedValueOnce(previousPokemon);

        const element = renderPokedex();
        fireEvent.click(element.container.getElementsByClassName("arrow-right-border")[0]);
        fireEvent.click(element.container.getElementsByClassName("rounded")[0]);
        fireEvent.click(element.getAllByText("2")[0]);
        fireEvent.click(element.getAllByText("5")[0]);
        fireEvent.click(element.container.getElementsByClassName("poke-button square green")[0]);
        await waitFor(() => {
            expect(element.container.getElementsByClassName("pokemon-view")[0].textContent).toBe('Pikachu');
        });
        fireEvent.click(element.container.getElementsByClassName("left")[0]);
        await waitFor(() => {
            expect(element.container.getElementsByClassName("pokemon-view")[0].textContent).toBe('Arbok');
            expect(mock).toBeCalledTimes(2);
            expect(mock).toHaveBeenNthCalledWith(2, 24);
        });
    });

    test("should not go to zero when pokemon is selected", async () => {
        const pokemon = {
            number: 1,
            name: 'Bulbasaur',
            image: ''
        };
        const none = {
            number: 0,
            name: 'Should Not Exist',
            image: ''
        };
        const mock = jest.spyOn(pokedexService, 'fetchPokemonById');
        mock.mockResolvedValueOnce(pokemon);
        mock.mockResolvedValueOnce(none);

        const element = renderPokedex();
        fireEvent.click(element.container.getElementsByClassName("arrow-right-border")[0]);
        fireEvent.click(element.container.getElementsByClassName("rounded")[0]);
        fireEvent.click(element.getAllByText("1")[0]);
        fireEvent.click(element.container.getElementsByClassName("poke-button square green")[0]);
        await waitFor(() => {
            expect(element.container.getElementsByClassName("pokemon-view")[0].textContent).toBe('Bulbasaur');
        });
        fireEvent.click(element.container.getElementsByClassName("left")[0]);
        expect(mock).toBeCalledTimes(1);
        expect(element.container.getElementsByClassName("pokemon-view")[0].textContent).toBe('Bulbasaur');
        expect(element.container.getElementsByClassName("dex-display gray large")[0].textContent).toBe("__1");
    });

    test("should not go to more than 151 when pokemon is selected", async () => {
        const pokemon = {
            number: 151,
            name: 'Mew',
            image: ''
        };
        const none = {
            number: 152,
            name: 'Should Not Exist',
            image: ''
        };
        const mock = jest.spyOn(pokedexService, 'fetchPokemonById');
        mock.mockResolvedValueOnce(pokemon);
        mock.mockResolvedValueOnce(none);

        const element = renderPokedex();
        fireEvent.click(element.container.getElementsByClassName("arrow-right-border")[0]);
        fireEvent.click(element.container.getElementsByClassName("rounded")[0]);
        fireEvent.click(element.getAllByText("1")[0]);
        fireEvent.click(element.getAllByText("5")[0]);
        fireEvent.click(element.getAllByText("1")[0]);
        fireEvent.click(element.container.getElementsByClassName("poke-button square green")[0]);
        await waitFor(() => {
            expect(element.container.getElementsByClassName("pokemon-view")[0].textContent).toBe('Mew');
        });
        fireEvent.click(element.container.getElementsByClassName("right")[0]);
        expect(mock).toBeCalledTimes(1);
        expect(element.container.getElementsByClassName("pokemon-view")[0].textContent).toBe('Mew');
        expect(element.container.getElementsByClassName("dex-display gray large")[0].textContent).toBe("151");
    });

    //search for empty will fetch list
});