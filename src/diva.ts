class Diva
{
	private files: { [ key: string ]: HTMLAudioElement };

	constructor()
	{
		this.files = {};
	}

	private _add( file: string, key?: string, )
	{
		if ( !key ) { key = file; }
		if ( this.files[ key ] && this.files[ key ].src === file ) { return this.files[ key ]; }
		this.files[ key ] = new Audio( file );
		return new Audio( file );
	}

	public add( ...files: (string | { file: string, name?: string, loop?: true })[] )
	{
		files.forEach( ( file ) =>
		{
			if ( typeof file === 'string' )
			{
				this._add( file );
			} else
			{
				this._add( file.file, file.name ).loop = !!file.loop;
			}
		} );
		return this;
	}

	public play( file: string )
	{
		if ( !this.files[ file ] ) { return this; }
		this.files[ file ].play();
		return this;
	}

	public pause( file?: string )
	{
		if ( file )
		{
			if ( !this.files[ file ] ) { return this; }
			this.files[ file ].pause();
			this.files[ file ].currentTime = 0;
			return this;
		}

		Object.keys( this.files ).forEach( ( key ) =>
		{
			this.files[ key ].pause();
			this.files[ key ].currentTime = 0;
		} );

		return this;
	}

	public stop( file?: string )
	{
		if ( file )
		{
			if ( !this.files[ file ] ) { return this; }
			this.files[ file ].pause();
			this.files[ file ].currentTime = 0;
			return this;
		}

		Object.keys( this.files ).forEach( ( key ) =>
		{
			this.files[ key ].pause();
			this.files[ key ].currentTime = 0;
		} );

		return this;
	}

	public next( file : string )
	{
		if ( !this.files[ file ] ) { return this; }

		Object.keys( this.files ).forEach( ( key ) =>
		{
			if ( key !== file )
			{
				this.files[ key ].pause();
				return;
			}
		} );

		this.files[ file ].play();

		return this;
	}

	public get( file: string ) { return this.files[ file ]; }

	public count() { return Object.keys( this.files ).length; }
}
