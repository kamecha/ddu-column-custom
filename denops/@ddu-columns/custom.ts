import {
  BaseColumn,
  GetLengthArguments,
  GetTextArguments,
  GetTextResult,
} from "https://deno.land/x/ddu_vim@v3.4.2/base/column.ts";
import { ItemHighlight } from "https://deno.land/x/ddu_vim@v3.4.2/types.ts";
import {
  ensure,
  is,
  Predicate,
} from "https://deno.land/x/unknownutil@v3.14.1/mod.ts";

export type Params = {
  getLengthCallbackId: string;
  getTextCallbackId: string;
};

const isItemHighlight: Predicate<ItemHighlight> = is.ObjectOf({
  name: is.String,
  hl_group: is.String,
  col: is.Number,
  width: is.Number,
});

const isGetTextResult: Predicate<GetTextResult> = is.ObjectOf({
  text: is.String,
  highlights: is.OptionalOf(
    is.ArrayOf(
      isItemHighlight,
    ),
  ),
});

export class Column extends BaseColumn<Params> {
  async getLength(args: GetLengthArguments<Params>): Promise<number> {
    if (!this.checkParams(args.columnParams)) {
      return Promise.resolve(0);
    }
    const length = ensure(
      await args.denops.call(
        "denops#callback#call",
        args.columnParams.getLengthCallbackId,
        args,
      ),
      is.Number,
    );
    return length;
  }
  async getText(args: GetTextArguments<Params>): Promise<GetTextResult> {
    if (!this.checkParams(args.columnParams)) {
      return Promise.resolve({ text: "" });
    }
    const result = ensure(
      await args.denops.call(
        "denops#callback#call",
        args.columnParams.getTextCallbackId,
        args,
      ),
      isGetTextResult,
    );
    return result;
  }
  params(): Params {
    return {
      getLengthCallbackId: "",
      getTextCallbackId: "",
    };
  }
  checkParams(params: Params): boolean {
    return params.getLengthCallbackId !== "" && params.getTextCallbackId !== "";
  }
}
