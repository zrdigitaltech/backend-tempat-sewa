<?php

namespace App\Filament\Resources;

use App\Filament\Resources\KontrakanResource\Pages;
use App\Filament\Resources\KontrakanResource\RelationManagers;
use App\Models\Kontrakan;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Card;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\TextArea;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;

use Filament\Tables\Actions\ViewAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\CreateAction;

class KontrakanResource extends Resource
{
  protected static ?string $model = Kontrakan::class;

  protected static ?string $navigationIcon = 'heroicon-o-building-library';

  protected static ?string $navigationLabel = 'Data Kontrakan';

  // protected static ?string $navigationGroup = 'Kontrakan';

  protected static ?int $navigationSort = 0;

  protected static ?string $label = 'Data Kontrakan';

  protected static ?string $slug = 'data-kontrakan';

  public static function form(Form $form): Form
  {
    return $form->schema([
      Card::make()
        ->schema([
          Repeater::make('image')
            ->label('Gambar')
            ->schema([
              FileUpload::make('image')
                ->acceptedFileTypes(['image/*'])
                ->required(),
            ])
            ->columns(1)
            ->defaultItems(1)
            ->minItems(1)
            ->maxItems(5)
            ->required(),
          TextInput::make('alt')->label('Alt')->default('Nama Pemilik Kontrakan'),
          TextInput::make('nama')
            ->unique()
            ->required()
            ->maxLength(255)
            ->reactive() // Make the field reactive to updates
            ->debounce('500ms') // Debounce updates to prevent rapid state changes
            ->afterStateUpdated(function ($state, callable $set) {
              // Ensure the state is not empty
              if (trim($state) === '') {
                return; // Skip url update if 'nama' is empty
              }

              // Generate the URL-friendly string based on the 'nama' field value
              $url = \Str::slug($state);

              // Update the 'url' field with the generated value
              $set('slug', $url);
            }),

          TextInput::make('slug')->unique()->required()->rules('regex:/^[a-z0-9-]+$/'),
          RichEditor::make('deskripsi')
            ->disableToolbarButtons(['attachFiles'])
            ->maxLength(255)
            ->required(),
          Textarea::make('keterangan')
            ->maxLength(255)
            ->nullable() // Allow the field to be empty
            ->label('Keterangan'),
          Repeater::make('harga_sewa')
            ->schema([
              TextInput::make('durasi')->label('Durasi (bulan)')->numeric()->required(),
              TextInput::make('harga')->label('Harga')->numeric()->required(),
            ])
            ->columns(2)
            ->defaultItems(1)
            ->minItems(1)
            ->maxItems(4)
            ->required()
            ->disableItemMovement(),
          Select::make('status')
            ->options([
              'tersedia' => 'Tersedia',
              'tidak tersedia' => 'Tidak Tersedia',
            ])
            ->default('tersedia')
            ->required(),
        ])
        ->columnSpanFull(),
    ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        // ImageColumn::make('image')->circular()->stacked()->limit(3)->limitedRemainingText(),
        // ImageColumn::make('image')
        //         ->label('Images')
        //         ->formatStateUsing(function ($state) {
        //             if (is_string($state)) {
        //                 $images = json_decode($state, true);
        //                 $html = '';

        //                 if (is_array($images)) {
        //                     foreach ($images as $item) {
        //                         if (isset($item['image'])) {
        //                             $html .= "<img src='" . htmlspecialchars($item['image']) . "' style='max-width: 100px; margin-right: 5px;' />";
        //                         }
        //                     }
        //                 }

        //                 return $html;
        //             }

        //             return '';
        //         })
        //         ->html(),
        TextColumn::make('nama')->searchable()->limit(15),
        // TextColumn::make('harga_sewa'),
        TextColumn::make('status')
          ->label('Status')
          ->formatStateUsing(function ($state) {
            $color = $state === 'tersedia' ? 'green' : 'red';
            $capitalizedState = ucfirst($state); // Capitalizes the first letter
            return "<span class=\"$color capitalize\" style=\"color: $color;\">$capitalizedState</span>";
          })
          ->html(),
      ])
      ->defaultSort('created_at', 'desc')
      ->striped()
      ->filters([
        //
      ])
      ->actions([
        ViewAction::make()->iconButton(),
        EditAction::make()->iconButton(),
        DeleteAction::make()->iconButton(),
      ])
      ->bulkActions([
        BulkActionGroup::make([
          DeleteBulkAction::make(),
          CreateAction::make()->createAnother(false),
        ]),
      ]);
  }

  public static function getRelations(): array
  {
    return [
        //
      ];
  }

  public static function getPages(): array
  {
    return [
      'index' => Pages\ListKontrakans::route('/'),
      'create' => Pages\CreateKontrakan::route('/create'),
      'edit' => Pages\EditKontrakan::route('/{record}/edit'),
    ];
  }

  public static function getNavigationLabel(): string
  {
    return __('Data Kontrakan');
  }

  public static function getNavigationGroup(): ?string
  {
    return __('Pengelolaan');
  }
}
