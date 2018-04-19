class Diva
{
	private files: { [ key: string ]: HTMLAudioElement };
	constructor()
	{
		this.files = {};
	}

	public add( ...files: (string | { file: string, loop: true })[] )
	{
		files.forEach( ( file ) =>
		{
			if ( typeof file === 'string' )
			{
				this.files[ file ] = new Audio();
				this.files[ file ].load();
			} else
			{
				this.files[ file.file ] = new Audio();
				this.files[ file.file ].loop = !!file.loop;
				this.files[ file.file ].load();
			}
		} );
		return this;
	}

	public play( file: string )
	{
console.log('play',file);
		if ( !this.files[ file ] ) { return this; }
		this.files[ file ].play();
		return this;
	}

	public stop( file?: string )
	{
		if ( file )
		{
			if ( !this.files[ file ] ) { return this; }
			this.files[ file ].pause();
			return this;
		}

		Object.keys( this.files ).forEach( ( key ) =>
		{
			this.files[ key ].pause();
		} );

	}

	public nextPlay( file : string )
	{
		if ( !this.files[ file ] ) { return; }
		Object.keys( this.files ).forEach( ( key ) =>
		{
			if ( key !== file )
			{
				this.files[ key ].pause();
				return;
			}
			if ( !this.files[ key ].ended ) { return; }
			this.files[ key ].play();
		} );
	}

	public get( file: string ) { return this.files[ file ]; }

	public count() { return Object.keys( this.files ).length; }
}
