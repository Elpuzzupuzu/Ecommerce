// Categorías principales
  import { Droplets, Link, CircleDot, Filter } from 'lucide-react';


    export const categories = [
        { name: 'Ferreteria', id: '2ded7b39-d779-476d-93fb-3f83fe981b4e', icon: Droplets },
        { name: 'Industriales', id: '381dd166-bbc5-43ac-96d1-96116fe4f355', icon: Link },
        { name: 'Domesticos', id: 'b05d6896-6aee-4461-9385-b46d32ec7c0a', icon: CircleDot },
        { name: 'Piscinas', id: 'c33a2429-2647-43b7-aa52-c307b38f2274', icon: Filter },
      ];

  // Subcategorías
    export const subcategories = [
      { name: 'SI', id: 'bfc4fc27-d4b0-4d59-822f-4f646337789b' },
      { name: 'CI', id: '6c108d41-d59c-4266-8adc-61f786ce3f83' },
      { name: 'FG', id: '740b5ded-01b7-4a54-b185-d0baadfbf57f' },
      { name: 'SS', id: 'b5dc40b5-01ab-4a61-a220-6fd33997e1af' },

      { name: 'PPR', id: 'd9389bae-351c-4e61-b47d-f2edc84ef2ca' },
      { name: 'VTM', id: '6c419818-b205-47d6-84a6-c810d8ed1b9a' },
      { name: 'PL', id: '52700653-511e-4915-b9ac-9f03d487cd28' },
      { name: 'PVC40', id: '910d204b-1c9f-479e-a490-e7c871a36cb7' },

      { name: 'CON', id: '343f4061-3bbd-4ad4-b6e1-6bfbb5cb0915' },
      { name: 'SB', id: '58267757-90fc-4d31-9bd1-283235c69577' },
      { name: 'BM', id: '6298a838-a0aa-456e-a0ce-4664f7e11ffa' },
      { name: 'AC', id: '4c3dcd28-9ea3-49ce-a627-8c5ba35317cc' },

      { name: 'CR', id: 'b72da7dc-ffda-48dc-901c-475051b7032d' },
      { name: 'CU', id: '9763ab1d-4a04-406a-9ef0-673389e291b9' },
      { name: 'PVC80', id: 'f8cd946c-ccb9-4506-8985-35cc81ba4d96' },
      { name: 'ME', id: '58f5099b-44a9-40df-b398-751ff053f978' },

      { name: 'VM', id: 'd372ccfb-5ccb-42bb-a3a6-b36f359dacd2' },
      { name: 'PI', id: '3228119a-8f42-4f82-a32c-8fad992c1159' },
      { name: 'FE', id: '9b2b86b8-9683-404f-b018-bfcba376dc2e' },
      { name: 'JYM', id: '146bf0d1-2464-47a2-a7b7-9fc7d09de44f' },

      { name: 'GAL', id: '2cd3cae8-a695-4c91-8a9d-3570d22bb849' },
      { name: 'EL', id: '1120b5ae-7039-4368-afac-969f25c78e88' },
      { name: 'NIP', id: '277877af-e75d-48a6-9281-7a64c19f228f' },
      { name: 'IN', id: '75d1fd52-bedd-4936-b44d-7571740cd95d' },

      { name: 'VIC', id: '5ce81115-3b88-40ab-b42e-244c73de066a' },
      { name: 'TA', id: 'f207b948-3909-4891-b233-c36738ddd5d3' },
      { name: 'CEM', id: '0366ba02-d514-444d-9300-02cd3513d567' },
      { name: 'SAN', id: '76fc8f39-dfdf-49f0-a148-145b6ebe6863' },

      { name: 'HT', id: '50d7bcc4-2708-44ee-9de3-03e1920cd0c3' },
      { name: 'CPVC8', id: '505b3325-c657-4db4-9c65-ffd7576e01ab' },
      { name: 'TOR', id: '19718803-c4f5-43f5-b4f7-d7a920eb8c5f' },
    ];

    export const priceRanges = [
      { label: 'Menos de $50', value: '0-50' },
      { label: '$50 - $100', value: '50-100' },
      { label: '$100 - $300', value: '100-300' },
      { label: 'Más de $300', value: '300+' }
    ];