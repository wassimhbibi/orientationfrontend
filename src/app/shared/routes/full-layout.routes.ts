import { Routes } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
   
    {
        path: 'faq',
        loadChildren: () => import('../../faq/faq.module').then(m => m.FaqModule)
    },
    {
        path: 'profile',
        
        loadChildren: () => import('../../profile/profile.module').then(m => m.ProfileModule)
    },
    {
        path: 'pricing',
        loadChildren: () => import('../../pricing/pricing.module').then(m => m.PricingModule)
    },

    
    
];