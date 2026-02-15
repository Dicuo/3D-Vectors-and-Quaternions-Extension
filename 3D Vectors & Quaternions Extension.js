(function(Scratch) {
    'use strict';
    if (!Scratch.extensions.unsandboxed) {
        throw new Error('\'3D Vectors & Quaternions\' must run unsandboxed!');
    }
    const {BlockType, BlockShape, ArgumentType, Cast, vm} = Scratch

    function span(text) {
        let el = document.createElement('span')
        el.innerText = text
        el.style.display = 'hidden'
        el.style.whiteSpace = 'nowrap'
        el.style.width = '100%'
        el.style.textAlign = 'center'
        return el
    }

    const menuIconURI = `data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0wLjAwMDIgLTEuMjYwNSAyMC4wMDAyIDIwLjAwMDUiIHdpZHRoPSIyMC4wMDAycHgiIGhlaWdodD0iMjEuMjYwNXB4IiB4bWxuczpieD0iaHR0cHM6Ly9ib3h5LXN2Zy5jb20iPgogIDxkZWZzPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudC00LTAiIGhyZWY9IiNncmFkaWVudC00IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjEwIiB5MT0iMCIgeDI9IjEwIiB5Mj0iMjAiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMSwgMCwgMCwgMSwgLTAuMDAwMzA3LCAtMS4yNjA5OTgpIi8+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWRpZW50LTQiPgogICAgICA8dGl0bGU+Um90b3IgT3V0bGluZTwvdGl0bGU+CiAgICAgIDxzdG9wIHN0eWxlPSJzdG9wLWNvbG9yOiByZ2IoODAsIDI2LCAxNDIpOyIgb2Zmc2V0PSIwIi8+CiAgICAgIDxzdG9wIHN0eWxlPSJzdG9wLWNvbG9yOiByZ2IoNDIsIDIyLCA5NSk7IiBvZmZzZXQ9IjEiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWRpZW50LTEtMCIgaHJlZj0iI2dyYWRpZW50LTEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iLTUiIHkxPSItMjAiIHgyPSItNSIgeTI9IjAiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMSwgMCwgMCwgMSwgMC4wMDEwOCwgMS4yNjE0NzgpIi8+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWRpZW50LTEiPgogICAgICA8dGl0bGU+VmVjdG9yIE91dGxpbmU8L3RpdGxlPgogICAgICA8c3RvcCBzdHlsZT0ic3RvcC1jb2xvcjogcmdiKDI1LCA2OCwgNTYpOyIgb2Zmc2V0PSIwIi8+CiAgICAgIDxzdG9wIHN0eWxlPSJzdG9wLWNvbG9yOiByZ2IoNDAsIDExNSwgODMpOyIgb2Zmc2V0PSIxIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudC0wLTAiIGhyZWY9IiNncmFkaWVudC0wIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjEwIiB5MT0iMSIgeDI9IjEwIiB5Mj0iMTkiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMSwgMCwgMCwgMSwgLTAuMDAwMzA3LCAtMS4yNjA5OTgpIi8+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWRpZW50LTAiIGJ4OnBpbm5lZD0idHJ1ZSI+CiAgICAgIDx0aXRsZT5Sb3RvciBGaWxsPC90aXRsZT4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjogcmdiKDE5MiwgNTIsIDIxMCk7Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6IHJnYigxNDksIDUyLCAyMTApOyIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQtMi0yIiBocmVmPSIjZ3JhZGllbnQtMiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIxNC41IiB5MT0iNS41IiB4Mj0iMTQuNSIgeTI9IjE0LjUiIGdyYWRpZW50VHJhbnNmb3JtPSJtYXRyaXgoMCwgLTIuMDAwMjM0LCAyLjAwMDIwMiwgMCwgLTEyLjE4NzUxMywgMzkuOTkwNzI5KSIvPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudC0yIiBieDpwaW5uZWQ9InRydWUiPgogICAgICA8dGl0bGU+VmVjdG9yIEZpbGw8L3RpdGxlPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiByZ2IoNjAsIDE5OCwgMTExKTsiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjogcmdiKDYwLCAxOTgsIDE0OSk7Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8ZWxsaXBzZSBzdHlsZT0ic3Ryb2tlLXdpZHRoOiAxOyBmaWxsOiB1cmwoJnF1b3Q7I2dyYWRpZW50LTQtMCZxdW90Oyk7IiBjeD0iMTAiIGN5PSI4Ljc0IiByeD0iMTAiIHJ5PSIxMCIgdHJhbnNmb3JtPSJtYXRyaXgoMSwgMCwgMCwgMSwgMy41NTI3MTM2Nzg4MDA1MDFlLTE1LCAxLjc3NjM1NjgzOTQwMDI1MDVlLTE1KSIvPgogIDxwYXRoIHN0eWxlPSJmaWxsOiB1cmwoJnF1b3Q7I2dyYWRpZW50LTEtMCZxdW90Oyk7IHRyYW5zZm9ybS1vcmlnaW46IC00Ljk5OXB4IC04LjczOXB4OyIgZD0iTSAtOS45OTkgLTE4LjczOSBBIDEwIDEwIDAgMSAxIC05Ljk5OSAxLjI2MSBBIDgxNjU2MTk2NzY1OTc2ODUwIDgxNjU2MTk2NzY1OTc2ODUwIDAgMCAxIC05Ljk5OSAtMTguNzM5IFoiIGJ4OnNoYXBlPSJjcmVzY2VudCAtOS45OTkgLTguNzM5IDEwIDE4MCAwLjUgMUA3Y2M5NDExZCIgdHJhbnNmb3JtPSJtYXRyaXgoLTEsIDAsIDAsIC0xLCA5Ljk5ODc3MjQzLCAxNy40Nzg0ODAxNSkiLz4KICA8cGF0aCBkPSJNIDE5IDguNzQgQyAxOSAxMy43MDggMTQuOTY3IDE3LjczNiAxMCAxNy43NCBDIDcuNTE4IDE3LjczNyA1LjUxNCAxNS43MjMgNS41MTQgMTMuMjQgQyA1LjUxNCAxMC43NTUgNy41MjkgOC43NCAxMC4wMTQgOC43NCBDIDEyLjQ5OSA4Ljc0IDE0LjUxNCA2LjcyNSAxNC41MTQgNC4yNCBDIDE0LjUxNCAxLjc2NiAxMi40NjkgLTAuMjQyIDEwIC0wLjI2IEMgMTQuOTQ5IC0wLjIzNCAxOSAzLjc4NSAxOSA4Ljc0IFoiIHN0eWxlPSJzdHJva2Utd2lkdGg6IDE7IGZpbGw6IHVybCgmcXVvdDsjZ3JhZGllbnQtMC0wJnF1b3Q7KTsiIHRyYW5zZm9ybT0ibWF0cml4KDEsIDAsIDAsIDEsIDMuNTUyNzEzNjc4ODAwNTAxZS0xNSwgMS43NzYzNTY4Mzk0MDAyNTA1ZS0xNSkiLz4KICA8cGF0aCBkPSJNIDEyLjMxMiAxNS40OTcgQyAxNC43OTcgMTUuNDk3IDE2LjgxMiAxMy40ODIgMTYuODEyIDEwLjk5NyBDIDE2LjgxMiA0LjA2OSA5LjMxMiAtMC4yNjEgMy4zMTIgMy4yMDMgQyAwLjUyNyA0LjgxIC0xLjE4OCA3Ljc4MiAtMS4xODggMTAuOTk3IEMgLTEuMTg4IDguNTEyIDAuODI3IDYuNDk3IDMuMzEyIDYuNDk3IEMgNS43OTcgNi40OTcgNy44MTIgOC41MTIgNy44MTIgMTAuOTk3IEMgNy44MTIgMTMuNDgyIDkuODI3IDE1LjQ5NyAxMi4zMTIgMTUuNDk3IFoiIHN0eWxlPSJzdHJva2Utd2lkdGg6IDE7IGZpbGw6IHVybCgmcXVvdDsjZ3JhZGllbnQtMi0yJnF1b3Q7KTsgdHJhbnNmb3JtLW9yaWdpbjogNy44MTJweCA4Ljc0cHg7IiB0cmFuc2Zvcm09Im1hdHJpeCgwLCAtMSwgMSwgMCwgNWUtOCwgLTAuMDAwMDAxMTgpIi8+CiAgPHBhdGggZD0iTSAxMi44OTcgNy4wNjggQyAxMy42NDggNi4zMTcgMTQuMDY5IDUuMzggMTQuMDY5IDQuMjQgQyAxNC4wNjkgMy4xIDEzLjY0OSAyLjE2MyAxMi44OTcgMS40MTIgQyAxMi4xNDYgMC42NjEgMTEuMjA5IDAuMjQgMTAuMDY5IDAuMjQgQyA2Ljc0NCAwLjI0IDQuMTY4IDEuOTYxIDIuNzA4IDQuNDkgQyAxLjI0OCA3LjAxOSAxLjAwOSAxMC4xMzEgMi43MDggMTIuOTkgQyAzLjYyOCAxNC42MjYgNS4wMDYgMTYuMDI3IDYuNjM4IDE2Ljg3NCBDIDYuNjAyIDE2Ljg0MiA2LjU2OCAxNi44MDkgNi41MzMgMTYuNzc1IEMgNS42NTYgMTUuODk4IDUuMDY4IDE0LjU4NCA1LjA2OCAxMy4yNCBDIDUuMDY4IDExLjg5NSA1LjY1NSAxMC41ODIgNi41MzMgOS43MDUgQyA3LjQxIDguODI4IDguNzI0IDguMjQgMTAuMDY4IDguMjQgQyAxMS4yMDggOC4yNCAxMi4xNDUgNy44MiAxMi44OTYgNy4wNjggTCAxMi44OTcgNy4wNjggWiIgc3R5bGU9InN0cm9rZS13aWR0aDogMTsgZmlsbC1ydWxlOiBub256ZXJvOyBwYWludC1vcmRlcjogZmlsbDsgZmlsbC1vcGFjaXR5OiAwLjI1OyBmaWxsOiByZ2IoOTMsIDIzOCwgMTc0KTsiIHRyYW5zZm9ybT0ibWF0cml4KDEsIDAsIDAsIDEsIDMuNTUyNzEzNjc4ODAwNTAxZS0xNSwgMS43NzYzNTY4Mzk0MDAyNTA1ZS0xNSkiLz4KICA8cGF0aCBkPSJNIDE3LjM5IDcuNDM1IEMgMTguMTQxIDYuNjg0IDE4LjU2MiA1Ljc0NyAxOC41NjIgNC42MDcgQyAxOC41NjIgMy40NjcgMTguMTQyIDIuNTMgMTcuMzkgMS43NzkgQyAxNi42MzkgMS4wMjggMTUuNzAyIDAuNjA3IDE0LjU2MiAwLjYwNyBDIDExLjIzNyAwLjYwNyA4LjY2MSAyLjMyOCA3LjIwMSA0Ljg1NyBDIDUuNzQxIDcuMzg2IDUuNTAyIDEwLjQ5OCA3LjIwMSAxMy4zNTcgQyA4LjEyMSAxNC45OTMgOS40OTkgMTYuMzk0IDExLjEzMSAxNy4yNDEgQyAxMS4wOTUgMTcuMjA5IDExLjA2MSAxNy4xNzYgMTEuMDI2IDE3LjE0MiBDIDEwLjE0OSAxNi4yNjUgOS41NjEgMTQuOTUxIDkuNTYxIDEzLjYwNyBDIDkuNTYxIDEyLjI2MiAxMC4xNDggMTAuOTQ5IDExLjAyNiAxMC4wNzIgQyAxMS45MDMgOS4xOTUgMTMuMjE3IDguNjA3IDE0LjU2MSA4LjYwNyBDIDE1LjcwMSA4LjYwNyAxNi42MzggOC4xODcgMTcuMzg5IDcuNDM1IEwgMTcuMzkgNy40MzUgWiIgc3R5bGU9InN0cm9rZS13aWR0aDogMTsgZmlsbC1ydWxlOiBub256ZXJvOyBwYWludC1vcmRlcjogZmlsbDsgZmlsbC1vcGFjaXR5OiAwLjI1OyBmaWxsOiByZ2IoMjM3LCA5MywgMjM4KTsgdHJhbnNmb3JtLW9yaWdpbjogMTIuMjg4M3B4IDguOTI0cHg7IiB0cmFuc2Zvcm09Im1hdHJpeCgtMSwgMCwgMCwgLTEsIDAuMDAwMDA0MTgsIDIuN2UtNykiLz4KICA8cGF0aCBkPSJNIDEyLjMxMiAxNS40OTYgQyAxNC43OTcgMTUuNDk2IDE2LjgxMiAxMy40ODEgMTYuODEyIDEwLjk5NiBDIDE2LjgxMiA0LjA2OCA5LjMxMiAtMC4yNjIgMy4zMTIgMy4yMDIgQyAwLjUyNyA0LjgwOSAtMS4xODggNy43ODEgLTEuMTg4IDEwLjk5NiBDIC0xLjE4OCA4LjUxMSAwLjgyNyA2LjQ5NiAzLjMxMiA2LjQ5NiBDIDUuNzk3IDYuNDk2IDcuODEyIDguNTExIDcuODEyIDEwLjk5NiBDIDcuODEyIDEzLjQ4MSA5LjgyNyAxNS40OTYgMTIuMzEyIDE1LjQ5NiBaIiBzdHlsZT0ic3Ryb2tlLXdpZHRoOiAxOyBmaWxsOiBub25lOyB0cmFuc2Zvcm0tb3JpZ2luOiA3LjgxMnB4IDguNzM5NDJweDsiIHRyYW5zZm9ybT0ibWF0cml4KDAsIC0xLCAxLCAwLCA1ZS04LCAtMC4wMDAwMDE2NikiLz4KICA8ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLjUwODI5Njk2NjU1MjczNDYsIDAsIDAsIDEuNTA4Mjk2OTY2NTUyNzM0NiwgMjQuMTg5MzQ2NjczOTI1OTE4LCAtMC4wMDU0NzIwMDAzMDQxOTE0ODIpIiBzdHlsZT0iIj4KICAgIDxwYXRoIGQ9Ik0gLTEuNzA4IDIuMjcgSCAxLjA5NiBMIDEuMDk2IDEuOTgzIEwgMS44NDkgMi40MzEgTCAxLjA5NiAyLjg3OSBMIDEuMDk2IDIuNTkzIEggLTEuNzA4IFYgMi4yNyBaIiBieDpzaGFwZT0iYXJyb3cgLTEuNzA4IDEuOTgzIDMuNTU3IDAuODk2IDAuMzIzIDAuNzUzIDAgMUAxNWFkZTc2ZCIgc3R5bGU9ImZpbGw6IHJnYigyNTUsIDI1NSwgMjU1KTsgc3Ryb2tlLXdpZHRoOiAwLjU4NzsiIHRyYW5zZm9ybT0ibWF0cml4KDAsIC0xLCAxLCAtMC4wMDA4OTYsIC0xMy43MzgwNzQsIDIuMDE0MzI3KSIvPgogICAgPHBhdGggZD0iTSAtMTEuMzAyIDEuNzU1IEwgLTkuNjczIDIuNjk2IEwgLTkuNjczIDQuNTc2IEwgLTExLjMwMiA1LjUxNyBMIC0xMi45MzEgNC41NzcgTCAtMTIuOTMxIDIuNjk2IFoiIGJ4OnNoYXBlPSJuLWdvbiAtMTEuMzAyIDMuNjM2IDEuODgxIDEuODgxIDYgMCAxQGJhNTE4YjIwIiBzdHlsZT0iZmlsbDogcmdiKDI1NSwgMjU1LCAyNTUpOyBzdHJva2Utd2lkdGg6IDAuNTg3OyIvPgogICAgPHBhdGggZD0iTSAtMS43MDggMi4yNyBIIDEuMDk2IEwgMS4wOTYgMS45ODMgTCAxLjg0OSAyLjQzMSBMIDEuMDk2IDIuODc5IEwgMS4wOTYgMi41OTMgSCAtMS43MDggViAyLjI3IFoiIGJ4OnNoYXBlPSJhcnJvdyAtMS43MDggMS45ODMgMy41NTcgMC44OTYgMC4zMjMgMC43NTMgMCAxQDE1YWRlNzZkIiBzdHlsZT0iZmlsbDogcmdiKDI1NSwgMjU1LCAyNTUpOyBzdHJva2Utd2lkdGg6IDAuNTg3OyB0cmFuc2Zvcm0tb3JpZ2luOiAwLjA3cHggMi40MzFweDsiIHRyYW5zZm9ybT0ibWF0cml4KDAuODY2MDI1LCAwLjUsIC0wLjQ5OTIyNCwgMC44NjY0NzQsIC05LjkyNzk2OSwgMi4wMDI2MjYpIi8+CiAgICA8cGF0aCBkPSJNIC0xLjcwOCAyLjI3IEggMS4wOTYgTCAxLjA5NiAxLjk4MyBMIDEuODQ5IDIuNDMxIEwgMS4wOTYgMi44NzkgTCAxLjA5NiAyLjU5MyBIIC0xLjcwOCBWIDIuMjcgWiIgYng6c2hhcGU9ImFycm93IC0xLjcwOCAxLjk4MyAzLjU1NyAwLjg5NiAwLjMyMyAwLjc1MyAwIDFAMTVhZGU3NmQiIHN0eWxlPSJmaWxsOiByZ2IoMjU1LCAyNTUsIDI1NSk7IHN0cm9rZS13aWR0aDogMC41ODc7IHRyYW5zZm9ybS1vcmlnaW46IDAuMDdweCAyLjQzMXB4OyIgdHJhbnNmb3JtPSJtYXRyaXgoLTAuODY2MDI1LCAwLjUsIDAuNDk5MjI0LCAwLjg2NjQ3NCwgLTEyLjc0MTk3OSwgMi4wMTc1NSkiLz4KICA8L2c+CiAgPGcgdHJhbnNmb3JtPSJtYXRyaXgoMS40NjMyNzQwMDIwNzUxOTUzLCAwLCAwLCAxLjQ2MzI3NDAwMjA3NTE5NTMsIC0yLjU1NjgyOTk2NzQ1MTU0MTYsIC02LjQzMTQ3MDAxMzEzMzczMykiIHN0eWxlPSIiPgogICAgPHBhdGggZD0iTSAtMS43MDggMi4yNyBIIDEuMDk2IEwgMS4wOTYgMS45ODMgTCAxLjg0OSAyLjQzMSBMIDEuMDk2IDIuODc5IEwgMS4wOTYgMi41OTMgSCAtMS43MDggViAyLjI3IFoiIGJ4OnNoYXBlPSJhcnJvdyAtMS43MDggMS45ODMgMy41NTcgMC44OTYgMC4zMjMgMC43NTMgMCAxQDE1YWRlNzZkIiBzdHlsZT0iZmlsbDogcmdiKDI1NSwgMjU1LCAyNTUpOyBzdHJva2Utd2lkdGg6IDAuNTg3OyIgdHJhbnNmb3JtPSJtYXRyaXgoMCwgLTEsIDEsIC0wLjAwMDg5NiwgNS40OTc0MjYsIDEzLjA0NjU4MSkiLz4KICAgIDxwYXRoIGQ9Ik0gMTAuMTE5IDExLjM2MiBMIDExLjc0OCAxMi4zMDMgTCAxMS43NDggMTQuMTg0IEwgMTAuMTE5IDE1LjEyNCBMIDguNDkgMTQuMTg0IEwgOC40OSAxMi4zMDMgWiIgYng6c2hhcGU9Im4tZ29uIDEwLjExOSAxMy4yNDMgMS44ODEgMS44ODEgNiAwIDFAZjZkYjFlMGUiIHN0eWxlPSJmaWxsOiByZ2IoMjU1LCAyNTUsIDI1NSk7IHN0cm9rZS13aWR0aDogMC41ODc7Ii8+CiAgICA8cGF0aCBkPSJNIC0xLjcwOCAyLjI3IEggMS4wOTYgTCAxLjA5NiAxLjk4MyBMIDEuODQ5IDIuNDMxIEwgMS4wOTYgMi44NzkgTCAxLjA5NiAyLjU5MyBIIC0xLjcwOCBWIDIuMjcgWiIgYng6c2hhcGU9ImFycm93IC0xLjcwOCAxLjk4MyAzLjU1NyAwLjg5NiAwLjMyMyAwLjc1MyAwIDFAMTVhZGU3NmQiIHN0eWxlPSJmaWxsOiByZ2IoMjU1LCAyNTUsIDI1NSk7IHN0cm9rZS13aWR0aDogMC41ODc7IHRyYW5zZm9ybS1ib3g6IGZpbGwtYm94OyB0cmFuc2Zvcm0tb3JpZ2luOiA1MCUgNTAlOyIgdHJhbnNmb3JtPSJtYXRyaXgoMC44NjYwMjUsIDAuNSwgLTAuNDk5MjI0LCAwLjg2NjQ3NCwgMTEuNDA0Mjc4LCA5LjE0MDM2OSkiLz4KICAgIDxwYXRoIGQ9Ik0gMS43MDggLTEuNjk3IEggNC41MTIgTCA0LjUxMiAtMS45ODMgTCA1LjI2NSAtMS41MzUgTCA0LjUxMiAtMS4wODcgTCA0LjUxMiAtMS4zNzQgSCAxLjcwOCBWIC0xLjY5NyBaIiBieDpzaGFwZT0iYXJyb3cgMS43MDggLTEuOTgzIDMuNTU3IDAuODk2IDAuMzIzIDAuNzUzIDAgMUA0YzFiNjg0OSIgc3R5bGU9ImZpbGw6IHJnYigyNTUsIDI1NSwgMjU1KTsgc3Ryb2tlLXdpZHRoOiAwLjU4NzsgdHJhbnNmb3JtLW9yaWdpbjogMy40ODdweCAtMS41MzVweDsiIHRyYW5zZm9ybT0ibWF0cml4KC0wLjg2NjAyNSwgMC41LCAwLjQ5OTIyNCwgMC44NjY0NzQsIDcuNDMxNzcxLCAxNi43NzYxNzgpIi8+CiAgPC9nPgo8L3N2Zz4=`

    class Vector3DType {
        customId = "divVector3D"
        constructor(x = 0, y = 0, z = 0) {
            this.x = x; this.y = y; this.z = z;
        }

        jwArrayHandler() {
            return 'Vector3D'
        }
        toString() {
            return `(${this.x}, ${this.y}, ${this.z})`
        }
        toReporterContent() {
            const root = document.createElement('div');
            root.style.display = 'flex';
            root.style.flexDirection = 'column';
            const s = span(`${this.toString()}`); s.style.fontWeight = "bold";
            root.appendChild(s);
            return root;
        }

        static toVector3D(v) {
            if(v instanceof Vector3DType) return v;
            return new Vector3DType()
        }

        add(rhs) {
            return new Vector3DType(this.x + rhs.x, this.y + rhs.y, this.z + rhs.z)
        }

        dot(rhs) {
            return this.x*rhs.x + this.y*rhs.y + this.z*rhs.z
        }
        cross(rhs) {
            return new Vector3DType(this.y*rhs.z - this.z*rhs.y, this.z*rhs.x - this.x*rhs.z, this.x*rhs.y - this.y*rhs.x)
        }

        get magsq() {
            return this.x*this.x + this.y*this.y + this.z*this.z
        }
        scale(s) {
            return new Vector3DType(this.x * s, this.y * s, this.z * s)
        }
        get norm() {
            return this.scale(1/Math.sqrt(this.magsq))
        }

        transform(q) {
            return q.mult(QuaternionType.withVec(1, this)).mult(q.conj).imag;
        }
    }
    class QuaternionType {
        customId = "divQuaternion"
        constructor(r = 0, yz = 0, zx = 0, xy = 0) {
            this.r = r;
            this.yz = yz; this.zx = zx; this.xy = xy;
        }

        jwArrayHandler() {
            return 'Quaternion'
        }
        toString() {
            return `${this.r} + ${this.yz} 𝒊 + ${this.zx} 𝑗 + ${this.xy} 𝑘`
        }
        toReporterContent() {
            const root = document.createElement('div');
            root.style.display = 'flex';
            root.style.flexDirection = 'column';
            const s = span(`${this.toString()}`); s.style.fontWeight = "bold";
            root.appendChild(s);
            return root;
        }

        static toQuat(q) {
            if(q instanceof QuaternionType) return q;
            return new QuaternionType()
        }
        static withVec(r, v) {
            return new QuaternionType(r, v.x, v.y, v.z)
        }
        static aroundAxis(ax, angle) {
            if(ax.magsq == 0) return new QuaternionType();
            if(angle == 0) return new QuaternionType(1);
            angle = angle * (Math.PI / 180)
            return QuaternionType.withVec(Math.cos(angle/2), ax.scale(Math.sin(angle/2)))
        }

        add(rhs) {
            return new QuaternionType(this.r + rhs.r, this.yz + rhs.yz, this.zx + rhs.zx, this.xy + rhs.xy)
        }
        // the big one
        mult(rhs) {
            return new QuaternionType(
                this.r*rhs.r - this.yz*rhs.yz - this.zx*rhs.zx - this.xy*rhs.xy,
                this.r*rhs.yz + this.yz*rhs.r + this.zx*rhs.xy - this.xy*rhs.zx,
                this.r*rhs.zx - this.yz*rhs.xy + this.zx*rhs.r + this.xy*rhs.yz,
                this.r*rhs.xy + this.yz*rhs.zx - this.zx*rhs.yz + this.xy*rhs.r
            )
        }

        get magsq() {
            return this.r*this.r + this.yz*this.yz + this.zx*this.zx + this.xy*this.xy
        }
        scale(s) {
            return new QuaternionType(this.r * s, this.yz * s, this.zx * s, this.xy * s)
        }
        get norm() {
            return this.scale(1/Math.sqrt(this.magsq))
        }

        get imag() {
            return new Vector3DType(this.yz, this.zx, this.xy);
        }
        get conj() {
            return new QuaternionType(this.r, -this.yz, -this.zx, -this.xy)
        }
        get inv() {
            return this.conj.scale(1/this.magsq)
        }
    }

    const divVecQuat = {
        Vector: {
            Type: Vector3DType,
            Color: {
                color1: "#3cc66f",
                color2: "#2ea06f",
                color3: "#2ea06f",
            },
            Block: {
                blockType: BlockType.REPORTER,
                blockShape: BlockShape.LEAF,
                forceOutputType: "divVector3D",
                allowDropAnywhere: true,
                disableMonitor: true,
            },
            Argument: {
                shape: BlockShape.LEAF,
                exemptFromNormalization: true,
                check: ["divVector3D"]
            }
        },
        Quat: {
            Type: QuaternionType,
            Color: {
                color1: "#9534d2",
                color2: "#7027c3",
                color3: "#7027c3",
            },
            Block: {
                blockType: BlockType.REPORTER,
                blockShape: BlockShape.BUMPED,
                forceOutputType: "divQuaternion",
                allowDropAnywhere: true,
                disableMonitor: true,
            },
            Argument: {
                shape: BlockShape.BUMPED,
                exemptFromNormalization: true,
                check: ["divQuaternion"]
            }
        },
    }

    class Extension {
        constructor() {
            vm.divVecQuat = divVecQuat;

            vm.runtime.registerSerializer(
                "divVector3D", 
                v => [v.x, v.y, v.z], 
                v => new Vector3DType(v[0], v[1], v[2])
            );
            vm.runtime.registerSerializer(
                "divQuaternion", 
                q => [q.r, q.yz, q.zx, q.xy], 
                q => new QuaternionType(q[0], q[1], q[2], q[3])
            );
        }

        getInfo = () => ({
            id: "divVecQuat",
            name: "3D Vectors & Quats",
            menuIconURI,
            blocks: [
                {
                    blockType: BlockType.LABEL,
                    text: 'Vectors'
                },
                {
                    opcode: 'vecNew',
                    text: 'vector ([X], [Y], [Z])',
                    arguments: {
                        X: {type: ArgumentType.NUMBER, defaultValue: 0},
                        Y: {type: ArgumentType.NUMBER, defaultValue: 0},
                        Z: {type: ArgumentType.NUMBER, defaultValue: 0},
                    },
                    ...divVecQuat.Vector.Block,
                    ...divVecQuat.Vector.Color,
                },
                {
                    opcode: 'vecComp',
                    text: 'get [COMP] of [V]',
                    arguments: {
                        COMP: {
                            type: Scratch.ArgumentType.STRING,
                            menu: "vecComp",
                            defaultValue: "x"
                        },
                        V: divVecQuat.Vector.Argument,
                    },
                    ...divVecQuat.Vector.Block,
                    ...divVecQuat.Vector.Color,
                },
                '---',
                {
                    opcode: 'vecAdd',
                    text: '[V1] + [V2]',
                    arguments: {
                        V1: divVecQuat.Vector.Argument,
                        V2: divVecQuat.Vector.Argument,
                    },
                    ...divVecQuat.Vector.Block,
                    ...divVecQuat.Vector.Color,
                },
                {
                    opcode: 'vecScale',
                    text: 'scale [V] by [S]',
                    arguments: {
                        V: divVecQuat.Vector.Argument,
                        S: {type: ArgumentType.NUMBER, defaultValue: 2},
                    },
                    ...divVecQuat.Vector.Block,
                    ...divVecQuat.Vector.Color,
                },
                {
                    opcode: 'vecDot',
                    text: '[V1] ⋅ [V2]',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        V1: divVecQuat.Vector.Argument,
                        V2: divVecQuat.Vector.Argument,
                    },
                    ...divVecQuat.Vector.Color,
                },
                {
                    opcode: 'vecCross',
                    text: '[V1] × [V2]',
                    arguments: {
                        V1: divVecQuat.Vector.Argument,
                        V2: divVecQuat.Vector.Argument,
                    },
                    ...divVecQuat.Vector.Block,
                    ...divVecQuat.Vector.Color,
                },
                '---',
                {
                    opcode: 'vecMagSq',
                    text: '‖[V]‖²',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        V: divVecQuat.Vector.Argument,
                    },
                    ...divVecQuat.Vector.Color,
                },
                {
                    opcode: 'vecNorm',
                    text: 'normalize [V]',
                    arguments: {
                        V: divVecQuat.Vector.Argument,
                    },
                    ...divVecQuat.Vector.Block,
                    ...divVecQuat.Vector.Color,
                },
                '---',
                {
                    opcode: 'vecTransform',
                    text: 'transform [V] by [Q]',
                    arguments: {
                        V: divVecQuat.Vector.Argument,
                        Q: divVecQuat.Quat.Argument,
                    },
                    ...divVecQuat.Vector.Block,
                    ...divVecQuat.Vector.Color,
                },

                {
                    blockType: BlockType.LABEL,
                    text: 'Quaternions'
                },
                {
                    opcode: 'quatNew',
                    text: 'quaternion [R] + [YZ] i + [ZX] j + [XY] k',
                    arguments: {
                        R: {type: ArgumentType.NUMBER, defaultValue: 1},
                        YZ: {type: ArgumentType.NUMBER, defaultValue: 0},
                        ZX: {type: ArgumentType.NUMBER, defaultValue: 0},
                        XY: {type: ArgumentType.NUMBER, defaultValue: 0},
                    },
                    ...divVecQuat.Quat.Block,
                    ...divVecQuat.Quat.Color,
                },
                {
                    opcode: 'quatWithVec',
                    text: 'quaternion with real: [R] and imag: [VEC]',
                    arguments: {
                        R: {type: ArgumentType.NUMBER, defaultValue: 1},
                        VEC: divVecQuat.Vector.Argument
                    },
                    ...divVecQuat.Quat.Block,
                    ...divVecQuat.Quat.Color,
                },
                {
                    opcode: 'quatAround',
                    text: 'rotation around axis [AXIS] with angle [ANGLE]',
                    arguments: {
                        AXIS: divVecQuat.Vector.Argument,
                        ANGLE: {type: ArgumentType.NUMBER, defaultValue: 90}
                    },
                    ...divVecQuat.Quat.Block,
                    ...divVecQuat.Quat.Color,
                },
                '---',
                {
                    opcode: 'quatReal',
                    text: 'real of [Q]',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        Q: divVecQuat.Quat.Argument,
                    },
                    ...divVecQuat.Quat.Color,
                },
                {
                    opcode: 'quatImag',
                    text: 'imag of [Q]',
                    arguments: {
                        Q: divVecQuat.Quat.Argument,
                    },
                    ...divVecQuat.Vector.Block,
                    ...divVecQuat.Quat.Color,
                },
                '---',
                {
                    opcode: 'quatAdd',
                    text: '[Q1] + [Q2]',
                    arguments: {
                        Q1: divVecQuat.Quat.Argument,
                        Q2: divVecQuat.Quat.Argument,
                    },
                    ...divVecQuat.Quat.Block,
                    ...divVecQuat.Quat.Color,
                },
                {
                    opcode: 'quatScale',
                    text: 'scale [Q] by [S]',
                    arguments: {
                        Q: divVecQuat.Quat.Argument,
                        S: {type: ArgumentType.NUMBER, defaultValue: 2},
                    },
                    ...divVecQuat.Quat.Block,
                    ...divVecQuat.Quat.Color,
                },
                {
                    opcode: 'quatMult',
                    text: '[Q1] * [Q2]',
                    arguments: {
                        Q1: divVecQuat.Quat.Argument,
                        Q2: divVecQuat.Quat.Argument,
                    },
                    ...divVecQuat.Quat.Block,
                    ...divVecQuat.Quat.Color,
                },
                {
                    opcode: 'quatInv',
                    text: '1 / [Q]',
                    arguments: {
                        Q: divVecQuat.Quat.Argument,
                    },
                    ...divVecQuat.Quat.Block,
                    ...divVecQuat.Quat.Color,
                },
                '---',
                {
                    opcode: 'quatMagSq',
                    text: '‖[Q]‖²',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        Q: divVecQuat.Quat.Argument,
                    },
                    ...divVecQuat.Quat.Color,
                },
                {
                    opcode: 'quatNorm',
                    text: 'normalize [Q]',
                    arguments: {
                        Q: divVecQuat.Quat.Argument,
                    },
                    ...divVecQuat.Quat.Block,
                    ...divVecQuat.Quat.Color,
                },
                {
                    opcode: 'quatConj',
                    text: 'conjugate [Q]',
                    arguments: {
                        Q: divVecQuat.Quat.Argument,
                    },
                    ...divVecQuat.Quat.Block,
                    ...divVecQuat.Quat.Color,
                },
            ],
            menus: {
                vecComp: {
                    acceptReporters: true,
                    items: [{text: "x", value: "x"}, {text: "y", value: "y"}, {text: "z", value: "z"}]
                }
            }
        })

        // Vectors
        vecNew({X, Y, Z}) {
            return new Vector3DType(Cast.toNumber(X), Cast.toNumber(Y), Cast.toNumber(Z))
        }
        vecComp({COMP, V}) {
            COMP = Cast.toString(COMP)
            V = Vector3DType.toVector3D(V)
            switch(COMP) {
                case "x": return V.x;
                case "y": return V.y;
                case "z": return V.z;
                default: return ""
            }
        }
        vecAdd({V1, V2}) {
            return Vector3DType.toVector3D(V1).add(Vector3DType.toVector3D(V2))
        }
        vecDot({V1, V2}) {
            return Vector3DType.toVector3D(V1).dot(Vector3DType.toVector3D(V2))
        }
        vecCross({V1, V2}) {
            return Vector3DType.toVector3D(V1).cross(Vector3DType.toVector3D(V2))
        }
        vecMagSq({V}) {
            return Vector3DType.toVector3D(V).magsq
        }
        vecScale({V, S}) {
            return Vector3DType.toVector3D(V).scale(Cast.toNumber(S))
        }
        vecNorm({V}) {
            return Vector3DType.toVector3D(V).norm
        }
        vecTransform({V, Q}) {
            return Vector3DType.toVector3D(V).transform(QuaternionType.toQuat(Q))
        }

        // Quaternions
        quatNew({R, YZ, ZX, XY}) {
            return new QuaternionType(Cast.toNumber(R), Cast.toNumber(YZ), Cast.toNumber(ZX), Cast.toNumber(XY))
        }
        quatWithVec({R, VEC}) {
            return QuaternionType.withVec(Cast.toNumber(R), Vector3DType.toVector3D(VEC))
        }
        quatReal({Q}) {
            return QuaternionType.toQuat(Q).r
        }
        quatImag({Q}) {
            return QuaternionType.toQuat(Q).imag
        }
        quatAdd({Q1, Q2}) {
            return QuaternionType.toQuat(Q1).add(QuaternionType.toQuat(Q2))
        }
        quatMult({Q1, Q2}) {
            return QuaternionType.toQuat(Q1).mult(QuaternionType.toQuat(Q2))
        }
        quatMagSq({Q}) {
            return QuaternionType.toQuat(Q).magsq
        }
        quatScale({Q, S}) {
            return QuaternionType.toQuat(Q).scale(Cast.toNumber(S))
        }
        quatNorm({Q}) {
            return QuaternionType.toQuat(Q).norm
        }
        quatConj({Q}) {
            return QuaternionType.toQuat(Q).conj
        }
        quatInv({Q}) {
            return QuaternionType.toQuat(Q).inv
        }
        quatAround({AXIS, ANGLE}) {
            return QuaternionType.aroundAxis(Vector3DType.toVector3D(AXIS), Cast.toNumber(ANGLE))
        }
    }
    Scratch.extensions.register(new Extension())
})(Scratch)