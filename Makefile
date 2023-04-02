upload:
	rsync -avPL --delete --exclude=.git -e ssh . gromnitsky@web.sourceforge.net:/home/user-web/gromnitsky/htdocs/js/examples/tv-program/
