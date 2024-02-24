import { Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import DeviceFrame from '../utils/deviceFrame';
import MobileNavPreview from './mobileNavPreview';
import NavLinksPreview from './navLinksPreview';
import Switch from '../utils/switch';
import { useSelector } from 'react-redux';
import { generalSettingsActions } from '../store/general-settings-slice';

const GeneralSettings = () => {
	const generalSettings = useSelector(
		(state) => state.generalSettings.generalSettings
	);
	return (
		<Grid
			container
			spacing={{ xs: 6, lg: 2 }}
			sx={{ justifyContent: 'center' }}>
			<Grid
				item
				lg={7.5}
				xs={12}>
				<Stack
					sx={{
						gap: '1.25rem',
						color: 'var(--gray-color)',
						width: { xs: '100%', lg: '70%' },
					}}>
					<Typography
						variant="h3"
						sx={{ fontSize: '1.5rem', fontWeight: '700' }}>
						إعدادات عامة
					</Typography>
					{generalSettings.map((setting, parentIndex) => (
						<Stack
							sx={{ gap: '0.75rem' }}
							key={setting.id}>
							<Typography
								variant="body1"
								sx={{ color: 'var(--gray-color)', fontWeight: '700' }}>
								{setting.name}
							</Typography>
							{setting.options.map((option, index) => (
								<Stack
									key={option.id}
									direction="row"
									sx={{
										color: 'var(--icons-color)',
										justifyContent: 'space-between',
										alignItemss: 'center',
									}}>
									<Typography
										variant="body1"
										sx={{ fontWeight: '500' }}>
										{option.name}
									</Typography>
									<Switch
										toggleSwitch={option.value}
										targetActions={generalSettingsActions}
										index={index}
										parentIndex={parentIndex}
									/>
								</Stack>
							))}
						</Stack>
					))}
				</Stack>
			</Grid>

			<Grid
				item
				sx={{ justifyContent: 'center', display: 'flex' }}
				lg={4.5}
				xs={12}>
				<DeviceFrame
					navComponent={<MobileNavPreview />}
					navLinksComponent={<NavLinksPreview />}
				/>
			</Grid>
		</Grid>
	);
};

export default GeneralSettings;
