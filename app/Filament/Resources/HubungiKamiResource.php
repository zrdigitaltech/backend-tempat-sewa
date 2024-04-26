<?php

namespace App\Filament\Resources;

use App\Filament\Resources\HubungiKamiResource\Pages;
use App\Filament\Resources\HubungiKamiResource\RelationManagers;
use App\Models\HubungiKami;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\TextArea;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Card;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;

use Filament\Tables\Actions\ViewAction;
use Filament\Tables\Actions\EditAction;
use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Actions\BulkActionGroup;
use Filament\Tables\Actions\DeleteBulkAction;
use Filament\Tables\Actions\CreateAction;

class HubungiKamiResource extends Resource
{
  protected static ?string $model = HubungiKami::class;

  protected static ?string $navigationIcon = 'heroicon-o-phone';

  protected static ?string $navigationLabel = 'Hubungi Kami';

  protected static ?string $navigationGroup = 'Hubungi Kami';

  protected static ?int $navigationSort = 7;

  public static ?string $label = 'Hubungi Kami';

  protected static ?string $slug = 'hubungi-kami';

  public static function form(Form $form): Form
  {
    return $form->schema([
      Card::make()
        ->schema([
          TextArea::make('alamat')->required()->rows(3)->maxLength(255),
          TextInput::make('no_wa')
            ->required()
            ->label('No Whatsapp')
            ->tel()
            ->telRegex('/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.\/0-9]*$/')
            ->maxLength(255),
          TextInput::make('link_no_wa')->label('Link No Whatsapp')->url()->maxLength(255),
          TextInput::make('embed_google_map')->label('Embed Google Map')->url()->maxLength(255),
          TextInput::make('link_konfirmasi_wa')
            ->label('Link Konfirmasi Whatsapp')
            ->url()
            ->maxLength(255),
        ])
        ->columnSpanFull(),
    ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->paginated(false)
      ->columns([
        TextColumn::make('no_wa')->label('No Whatsapp'),
        TextColumn::make('alamat')->words(7),
      ])
      ->selectable(false)
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
      'index' => Pages\ListHubungiKamis::route('/'),
      'create' => Pages\CreateHubungiKami::route('/create'),
      'edit' => Pages\EditHubungiKami::route('/{record}/edit'),
    ];
  }

  public static function getNavigationLabel(): string
  {
    return __('Hubungi Kami');
  }

  public static function getNavigationGroup(): ?string
  {
    return __('Admin Web');
  }
}
