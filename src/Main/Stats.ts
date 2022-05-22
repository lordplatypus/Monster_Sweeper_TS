class Stats
{
    private stats_: Map<string, number>;

    constructor(columns: number, rows: number, monsterNum: number)
    {
        this.stats_ = new Map<string, number>();

        this.stats_.set("TileSize", 32);
        this.stats_.set("Columns", columns);
        this.stats_.set("Rows", rows);
        this.stats_.set("MonsterNumber", monsterNum);
    }

    public GetStat(statName: string) : number
    {
        const stat: number | undefined = this.stats_.get(statName);
        if (stat === undefined) return -1;
        else return stat; 
    }

    public SetStat(statName: string, value: number)
    {
        this.stats_.set(statName, value);
    }

    public get TILE_SIZE(): number {return this.GetStat("TileSize");}
    public set COLUMNS(columns: number) {this.SetStat("Columns", columns);}
    public get COLUMNS(): number {return this.GetStat("Columns");}
    public set ROWS(rows: number) {this.SetStat("Rows", rows);}
    public get ROWS(): number {return this.GetStat("Rows");}
    public set MONSTER_NUM(monsterNum: number) {this.SetStat("MonsterNumber", monsterNum);}
    public get MONSTER_NUM(): number {return this.GetStat("MonsterNumber");}
}

export { Stats }