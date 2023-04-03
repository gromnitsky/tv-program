upload:
	rsync -avPL --delete --exclude=.git --exclude=.ph -e ssh . gromnitsky@web.sourceforge.net:/home/user-web/gromnitsky/htdocs/js/examples/tv-program/
