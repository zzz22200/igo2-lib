Prérequis

  - NodeJS
  - NPM
  - Git

Installation
 
  - git clone https://github.com/infra-geo-ouverte/igo2-lib.git
  - cd igo2-lib
  - git fetch
  - git checkout exercise
  - npm install
  - npm start

- Mise en place

  - * Dans le module "shared", créer un dossier "table" avec les fichiers
    ".ts", ".styl", ".html" et ".spec". Pour l'instant on laisse tomber le ".spec".

    Pour l'instant, laisser les templates de base dans les fichiers.

  - * Ajouter un "index.ts" avec l'export du table-component

    '''
    export * from './table.component';
    '''

  - * Dans "index.ts" du module "shared", ajouter un export du dossier "table"
    
    '''
    export * from './table';
    '''

  - Dans "module.ts", import "TableComponent" et l'ajouter à la liste des déclarations
    et des exports.

    '''
    import { TableComponent } from './table';

    ...

    exports: [
      ...,
      TableComponent
    ],
    declarations: [
      ...,
      TableComponent
    ]
    '''

  - Dans "demo-app/app/app.component.html", ajouter un espace (card) pour le component
    et y ajouter la balise "igo-table".

- Template de TableComponent

  - Remplacer le code dans table.component.html par le suivant:

    '''
    <table class="igo-striped">
      <tbody>
        <tr>
          <th *ngFor="let header of headers">
            {{header.title}}
          </th>
        </tr>

        <tr *ngFor="let record of records">
          <ng-template ngFor let-header [ngForOf]="headers">
            <td>
              {{record[header.value]}}
            </td>
          </ng-template>
        </tr>
        
      </tbody>
    </table>
    '''

  - La page se rafraîchit automatiquement. Dans la console du navigateur on remarque
    que rien ne s'affiche car "headers" et "records" ne sont pas définis.

  - Définir "records" et "headers" de la façon suivante dans le component

    '''
    public headers = [
      {
        title: 'ID',
        value: 'id'
      },
      {
        title: 'First Name',
        value: 'firstname'
      },
      {
        title: 'Last Name',
        value: 'lastname'
      }
    ];

    public records = [
      {
        id: 1,
        firstname: 'Bill',
        lastname: 'Gates'
      },
      {
        id: 2,
        firstname: 'Alice',
        lastname: 'Cooper'
      },
      {
        id: 3,
        firstname: 'Marco',
        lastname: 'Polo'
      },
      {
        id: 4,
        firstname: 'Connor',
        lastname: 'McDavid'
      }
    ]
    '''

  - La page se rafraîchit automatiquement et la table s'affiche correctement

- Fournir des données à la table

  - Déplacer "headers" et "records" dans "demo-app/app/app.component.ts"

  - Définir un interface "TableHeader" dans "table.interface.ts"

    '''
    export interface TableHeader {
      title: string;
      value: string;
    }
    '''

  - Dans "table.component.ts", importer "Input" depuis "@angular/core" et "TableHeader"
    depuis "./table.interface"

    '''
    import { Component, Input } from '@angular/core';
    '''

  - Ajouter le code suivant pour indiquer que "headers" est un input du component

    '''
    @Input()
    get headers(): TableHeader[] { return this._headers; }
    set headers(value: TableHeader[]) {
      this._headers = value;
    }
    private _headers: TableHeader[] = [];

    @Input()
    get records(): {[key: string]: any}[] { return this._records; }
    set records(value: {[key: string]: any}[] ) {
      this._records = value;
    }
    private _records: {[key: string]: any}[] = [];
    '''

    Dans le code ci-haut, nous décorons "headers" avec le décorateur "Input". C'est cela
    qui permettra de passer les headers en argument au component.

    De plus, nous définissions un "getter" et un "setter" pour cette propriété dont
    la valeur est conservée dans "_headers". Notez la présente de l'underscore et du
    mot clé "private". Une propriété "private" n'est accessible qu'à l'intérieur
    du component où elle se trouve mais pas dans son template HTML. Si l'on ne met rien devant
    la propriété elle est "public". L'autre type possible est "protected" qui permet aux classes
    enfants d'accéder à la propriété.

    Notez aussi que dans ce cas il y a un underscore devant headers mais ce n'est pas devant
    toutes les variables privées que l'on doit en mettre. Seulement lorsqu'un getter et un setter sont
    définis.

    On indique aussi avec "TableHeader[]", que cette propriété doit être un array de "TableHeader"

  - Dans "demo-app/app/app.component.html", fournir "headers" et "records" <a la table de la façon suivante:

    '''
    <igo-table [headers]="headers" [records]="records"></igo-table>
    '''

- Rendre les données dynamiques

  Les données son, en fait, déjà dynamiques. Aussitôt que "records" change, la table
  se mettra à jour. Par contre, ce genre de données sont généralement stockées dans un
  "Observable", soit un type d'objet qui émet un message lorsqu'il change. Dans cet partie
  nous allons créer un observable et afficher les données qu'il contient dans la table.

  - Dans "demo-app/app/app.component.ts", créer un observable de la façon suivante:

    '''
    import { BehaviorSubject } from 'rxjs/BehaviorSubject';

    ...

    export class AppComponent implements OnInit {

      ...

      public records$ = new BehaviorSubject<{[key: string]: any}[]>([]);

      ...

      ngOnInit() {

        ...

        this.records$.next([
          {
            id: 1,
            firstname: 'Bill',
            lastname: 'Gates'
          },
          {
            id: 2,
            firstname: 'Alice',
            lastname: 'Cooper'
          },
          {
            id: 3,
            firstname: 'Marco',
            lastname: 'Polo'
          }
        ]);
      }

      ...

    }
    '''

    Effacer complètment la variable "records" qui est remplacé par "records$".

    Dans ce bout de code nous importons d'abord "BehaviorSubject" qui est une classe
    observable.

    On créée ensuite une instance de cette classe en lui spécifiant que le type
    de valeurs qu'elle va contenir est une liste de "{[key: string]: any}". On
    l'instantie également avec une valeur initiale (liste vide []). Notez que le
    nom de la propriété se termine par un "$". C'est une convention utilisée pour dénoter
    un objet observable.

    Finalement, dans la méthode "ngOnInit", qui est automatiquement appelée par Angular,
    nous donnons une valeur à l'observale "record$" en utilisant la méthode "next".

  - La page se rafraîchit automatiquement et rien ne s'affiche dans la table. Effectivement,
    la table cherche les valeurs dans "records" qui n'existe plus. Nous pouvons lui dire d'utiliser
    "records$" de la façon suivante:

    '''
    <igo-table [headers]="headers" [records]="records$ | async"></igo-table>
    '''

    Les données s'affichent correctement et nous sommes de retour au point de départ. Pourquoi
    avoir fait cela? Les "Observables" sont des objets très puissants et dès qu'on veut rendre une
    application un peu dynamique, ils sont très utiles. Nous n'en parlerons pas en profondeur
    pour l'instant mais pour démontrer leur utilité, nous allons modifier le code que nous avons fait
    et se connecter sur un autre "Observable".

- Changer la source de données

  L'outil de recherche sauvegarde ses résultats dans un service appelé "FeatureService".
  Ce service a une propriété "features$" qui peut être observée et qui change chaque fois
  qu'une recherche est faite. Utilisons cette propriété comme source de données.

  - Dans "demo-app/app/app.component.ts", effacer "records$" et l'import de "BehaviorSubject".
    Normalement, il faudrait importer le FeatureService et l'injecter mais c'est déjà fait.

  - Comme les "Feature" stockés dans le "FeatureService" n'ont pas les même propriétés que
    celle que nous tulisions auparavant, il faut modifier "headers" de la façon suivante:

    '''
    public headers = [
      {
        title: 'ID',
        value: 'id'
      },
      {
        title: 'Source',
        value: 'source'
      },
      {
        title: 'Type',
        value: 'type'
      },
      {
        title: 'Title',
        value: 'title'
      }
    ];
    '''

  - Dans "demo-app/app/app.component.html", nous allons nous connecter à l'observable
    "featureService.features$" plutôt que "records$", qui n'existe plus.

    '''
    <igo-table [headers]="headers" [records]="featureService.features$ | async"></igo-table>
    '''

    La page se refraîcit automatiquement et la table est vide. C'est normal car elle est
    connectée aux résultats de recherche et aucune recherche n'a été effectuée. Effectuez
    des recherches et voyez les résultats s'afficher.

- Rendre les données sélectionnables

  Nous aimerions pouvoir sélectionner un résultat en cliquant dessus et pouvoir naviguer
  parmi les résultats avec les flèches du clavier. Pour y arriver, nous allons réutiliser
  un "component" et une "directive" de la librarie IGO.

  - Dans "lib/shared/list", localiser "list.component*" et "list.directive*".

  - La directive "ListItemDirective" peut être placée sur n'importe quel élément contenu dans un
    component "ListComponent". Nous allons donc modifier le template de notre table
    pour en faire une "ListComponent" et appliquer la directive sur chacune des lignes de la table.

    Remplace le contenu du fichier ".html" par:

    '''
    <igo-list [navigation]="true" [selection]="true"> 
      <table class="igo-striped">
        <tbody>
          <tr>
            <th *ngFor="let header of headers">
              {{header.title}}
            </th>
          </tr>

          <ng-template ngFor let-record let-i="index" [ngForOf]="records">
            <tr
              igoListItem
              color="accent">
              <ng-template ngFor let-header [ngForOf]="headers">
                <td>
                  {{record[header.value]}}
                </td>
              </ng-template>
            </tr>
          </ng-template>
          
        </tbody>
      </table>
    </igo-list>
    '''

  - La liste est maintenant sélectionnable et navigable mais comment, à partir de l'application,
    fait-on pour récupérer le résultat sélectionné? La directive "IgoListItemDirective"
    permet d'écouter 4 événements soit "focus", "unfocus", "select" et "unselect".

    Ces événements sont "écoutables" dans le component "table" mais ils ne sont pas propagées
    jusqu';a l'application. Pour ce faire, ajouter le code suivant dans le fichier ".ts".

    '''
    import { Component, Input, Output, EventEmitter } from '@angular/core';

    ...

    export class TableComponent {

    ...

    @Output() focus = new EventEmitter<{[key: string]: any}>();
    @Output() select = new EventEmitter<{[key: string]: any}>();
    @Output() unfocus = new EventEmitter<{[key: string]: any}>();
    @Output() unselect = new EventEmitter<{[key: string]: any}>();

    }
    '''

    Ajouter aussi ce code dans le fichier ".html":

    '''
    ...

    <tr
      igoListItem
      color="accent"
      (focus)="focus.emit(record)"
      (select)="select.emit(record)"
      (unfocus)="unfocus.emit(record)"
      (unselect)="unselect.emit(record)">
      <ng-template ngFor let-header [ngForOf]="headers">
        <td>
          {{record[header.value]}}
        </td>
      </ng-template>
    </tr>

    ...

    '''

  - Les événements "focus", "unfocus", "select" et "unselect" sont capturés et réémis.
    Pour les écouter, modifier la ligne dans "demo-app/app/app.component.html" où la table est ajoutée par:

    '''
    <igo-table
      [headers]="headers"
      [records]="featureService.features$ | async"
      (focus)="handleRecordFocus($event)"
      (select)="handleRecordSelect($event)">
    </igo-table>
    '''

    Ajouter aussi ceci dans "demo-app/app/app.component.ts"

    '''
    handleRecordFocus(record: {[key: string]: any}) {
      console.log(`Record ${record['id']} focused!`);
      if (record['type'] === FeatureType.Feature) {
        this.overlayService.setFeatures([record as Feature], 'move');
      }
    }

    handleRecordSelect(record: {[key: string]: any}) {
      console.log(`Record ${record['id']} selected!`);
      if (record['type'] === FeatureType.Feature) {
        this.overlayService.setFeatures([record as Feature], 'zoom');
      }
    }
    '''

- Styliser la table

  - La table peu être stylisée avec "stylus" (compilé en CSS). Pour ce faire, ajouter
    le contenu suivant au fichier "lib/shared/table/table.component.styl"

    '''
    @require '../../../style/var.styl';

    td, th {
      padding: $igo-padding;
    }
    '''

    Dans ce bout de stylus, nous ajoutons du padding aux éléments "td" et "th". La valeur
    de ce padding est stockée dans une variable pour être réutilisables. Notez que le style
    dans une fichier ".styl" d'un component s'applique UNIQUEMENT à ce component et non à
    l'entièrement des éléments contenus dans la page.

    Lors qu'on stylise un component, il y a quelques principes à suivre:

    - Définir les variables dans le fichier "var.styl"
    - Définir les classes susceptibles d'être réutilisables dans "cls.styl"
    - Définir les règles qui devraient d'appliquer à tous les éléments de la page dans "igo.styl"
    - Définir les couleurs dans le theme correspondant ("deeppurple-amber.styl")
    - Définir les règles de positionnement de l'élément dans le fichier ".styl" du component parent (
      dans notre cas app.component.styl)

- Créer un outil de table

  - Fait mais à documenter
