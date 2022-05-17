const Styles = {
	colors: {
		accent: null,
		background: null,
		commentBackground: null,
		primary: '#04C3CB',
		codes: ['#755DB9', '#FF0261', '#FF8221', '002C45', '#014A60', 'CB3904', '#755DB9'],
	},
};

Styles.setAccent = () => {
	Styles.colors.accent = window
		.getComputedStyle(document.querySelector('[aria-label="Invite"]'))
		.getPropertyValue('--primary-button-background');
};

Styles.setBackground = () => {
	Styles.colors.commentBackground = 'var(--comment-background)';
	Styles.colors.background = 'var(--web-wash)';
	Styles.colors.surfaceBackground = 'var(--surface-background)';
	Styles.colors.textColor = 'var(--secondary-button-text)';
};
