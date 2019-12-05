export class MailInformer {

    private _from: string;
    private _to: string;
    private _subject: string;
    private _text: string;

    public constructor(from: string, to:string, subject: string, text: string) {
        this._from = from;
        this._to = to;
        this._subject = subject;
        this._text = text;
    }

    public setFrom = (from: string): void => {
        this._from = from;
    }

    public getInfoObject = (): {} => {
        return {
            from: this._from,
            to: this._to,
            subject: this._subject,
            text: this._text
        }
    }
}
