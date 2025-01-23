import cron from 'node-cron';
import { Op } from 'sequelize';
import ListingView from '../db/models/ListingView/ListingView';

export const setupCleanupJob = () => {
  cron.schedule('0 0 * * *', async () => {
    console.log('Running cleanup job for old listing views...');

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setMonth(thirtyDaysAgo.getMonth() - 1);

    try {
      const result = await ListingView.destroy({
        where: {
          viewedAt: {
            [Op.lt]: thirtyDaysAgo,
          },
        },
      });
      console.log(`Cleanup job completed. Deleted ${result} old views.`);
    } catch (error) {
      console.error('Error running cleanup job:', error);
    }
  });
};