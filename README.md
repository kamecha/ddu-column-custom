# ddu-column-custom
custom column for ddu.vim

## Feature
you can create custom column.

It is useful to create column related to the other ddu-plugin.

## Required
### denops.vim
https://github.com/vim-denops/denops.vim

### ddu.vim
https://github.com/Shougo/ddu.vim

## Configuration
```vim
function s:hoge(args)
  return #{ text: "unko" }
endfunction

call ddu#custom#patch_global(#{
  \   columns: [
  \     #{
  \       name: "custom",
  \       params: #{
  \         getLengthCallbackId: denops#callback#register({ _ -> 4 }),
  \         getTextCallbackId: denops#callback#register(function('s:hoge'))
  \       }
  \     }
  \   ],
  \ })
```

