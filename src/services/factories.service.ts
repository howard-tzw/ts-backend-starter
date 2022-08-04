import { googleSpreadsheetCreds } from '@/config';
import { Factory } from '@interfaces/factories.interface';
import { GoogleSpreadsheet } from 'google-spreadsheet';

class FactoriesService {
  private docId = '12-bJ9eUe9Q-EL71Rzai8KP1bgMurjpVpsuTQetNfQHQ';
  private sheetId = 1069525880;
  private doc = new GoogleSpreadsheet(this.docId);

  public async findAllFactories(): Promise<Factory[]> {
    await this.doc.useServiceAccountAuth(googleSpreadsheetCreds);
    await this.doc.loadInfo();
    const sheet = this.doc.sheetsById[this.sheetId];
    const rows = await sheet.getRows();

    const factories: Factory[] = [];

    for (const row of rows) {
      const data = row._rawData;
      factories.push({
        id: data[0],
        display_number: data[1],
        lat: data[2],
        lng: data[3],
        name: data[4],
        landcode: data[5],
        townname: data[6],
        sectname: data[7],
        sectcode: data[8],
        source: data[9],
        type: data[11],
        before_release: data[13],
        images: data[14],
      });
    }
    return factories;
  }

  public async createFactory(factory: Factory): Promise<Factory> {
    await this.doc.useServiceAccountAuth(googleSpreadsheetCreds);
    await this.doc.loadInfo();
    const sheet = this.doc.sheetsById[this.sheetId];

    await sheet.addRow({
      id: factory.id,
      display_number: factory.display_number,
      lat: factory.lat,
      lng: factory.lng,
      name: factory.name,
      landcode: factory.landcode,
      townname: factory.townname,
      sectname: factory.sectname,
      sectcode: factory.sectcode,
      source: factory.source,
      type: factory.type,
      before_release: factory.before_release,
      images: JSON.stringify(factory.images),
    });

    return factory;
  }

  public async updateFactory(factoryId: string, factory: Partial<Factory>): Promise<Factory> {
    await this.doc.useServiceAccountAuth(googleSpreadsheetCreds);
    await this.doc.loadInfo();
    const sheet = this.doc.sheetsById[this.sheetId];

    const rows = await sheet.getRows();
    const row = rows.find(r => r['id'] === factoryId);

    for (const key in factory) {
      row[key] = factory[key];
    }

    await row.save();

    const data = row._rawData as Factory;
    return data;
  }
}

export default FactoriesService;
