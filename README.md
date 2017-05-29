# scp-3125

This small project builds and encrypts the text of the [SCP Foundation wiki](http://www.scp-wiki.net/) entry, [*SCP-3125*](http://www.scp-wiki.net/scp-3125).

The text of the wiki entry is kept in plain old, unencrypted HTML at [`src/html/scp-3125/en.html`](https://github.com/qntm/scp-3125/tree/master/src/html/scp-3125). When

```npm run encrypt```

is run, the HTML is partially encrypted, JavaScript is added for the keypad-based decryption, CSS is also added, and the whole shebang is stuck inside a `[[html]]` block, which is output to `dist/en.txt`. I then take that text file and put it into the wiki.

## Translating *SCP-3125* into another language

1. Take the English HTML at [`src/html/scp-3125/en.html`](https://github.com/qntm/scp-3125/en.html) and copy it to e.g. `src/html/scp-3125/fr.html`.
2. Translate the new HTML file into your target language. Please be careful not to modify any of the keypad HTML, CSS class names or JavaScript listener attributes, as this could affect the functionality of the output.
3. Run `npm run encrypt`. This will create a new file, in this case `dist/fr.txt`, whose contents you can use in your wiki.
4. (Optional) Submit a pull request to have your new translation pulled in to this repository.

## License

As with (most of) the rest of the SCP Foundation wiki, this repository is released under [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
