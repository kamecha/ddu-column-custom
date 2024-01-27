import {
  BaseColumn,
  GetLengthArguments,
  GetTextArguments,
  GetTextResult,
} from "https://deno.land/x/ddu_vim@v3.4.2/base/column.ts";

export type Params = {
  getLengthCallbackId: string;
  getTextCallbackId: string;
};

export class Column extends BaseColumn<Params> {
  async getLength(args: GetLengthArguments<Params>): Promise<number> {
    if (!this.checkParams(args.columnParams)) {
      return Promise.resolve(0);
    }
    const length = await args.denops.call(
      "denops#callback#call",
      args.columnParams.getLengthCallbackId,
      args,
    );
    return length as number;
  }
  async getText(args: GetTextArguments<Params>): Promise<GetTextResult> {
    if (!this.checkParams(args.columnParams)) {
      return Promise.resolve({
        text: "",
      });
    }
    const result = await args.denops.call(
      "denops#callback#call",
      args.columnParams.getTextCallbackId,
      args,
    );
    return result as GetTextResult;
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
