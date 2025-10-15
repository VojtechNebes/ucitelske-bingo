# Učitelské Bingo!
Hra pro SSPŠ studenty

# Contributing
Pokud máte učitele, který ve hře ještě není, nebo jen chcete přidat další možnosti, můžete vytvořit *pull request*.

Formát je následující:
- V `/index.html` je tag `<select id="ucitelDropdown">`, do kterého můžete přidávat nové učitele.
- CSS třídy `mode-3`, `mode-4` a `mode-5` určují, jak velká může být bingo tabulka. Pro tabulku 3x3 (`mode-3`) je potřeba 9 a více možností. Pro 4x4 16 možností, ...
- Možnosti se dají definovat v souborech `/play/cells/`. Soubor pro učitele musí mít stejný název, jako `value` atribut v `/index.html`.
- Soubor s možnostmi v `/play/cells/` je plaintext soubor, kdy na prvním řádku je zobrazované jméno učitele a na každém dalším řádku je jedna možnost.

### Příklad přidání nového učitele
- Zobrazované jméno: Jméno
- Zjednodušené jméno: jmeno

`/index.html`:
```html
...
<select id="ucitelDropdown">
    <option value="jmeno" class="mode-3">Jméno</option>
    ...
</select>
...
```

`/play/cells/jmeno`:
```
Jméno
možnost 1
možnost 2
možnost 3
možnost 4
možnost 5
možnost 6
možnost 7
možnost 8
možnost 9
...
```

### Pravidla pro přispívání
Prosím dodržujte, jinak vám ten pull request nevezmu.

- Neodebírejte staré možnosti, pokud jsou stále relevantní (nevadí, když bude možností víc než 9, 16, 25).
- Pokud děláte jiné změny na webu než přidávání nových možností nebo učitele, tak to dejte do odděleného pull requestu, ať v tom není bordel.
- Žádné rasistické, homofobní, sprosté, nebo jakkoliv jinak nevhodné možnosti nebo jména učitelů
- Nic, co by uráželo nebo jakkoliv shazovalo konkrétní učitele. Je to pro zábavu, máme rádi své učitele.