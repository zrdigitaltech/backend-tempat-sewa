<?php

namespace App\Filament\Resources;

use App\Filament\Resources\KontakKamiResource\Pages;
use App\Filament\Resources\KontakKamiResource\RelationManagers;
use App\Models\KontakKami;
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

class KontakKamiResource extends Resource
{
  protected static ?string $model = KontakKami::class;

  protected static ?string $navigationIcon = 'heroicon-o-identification';

  protected static ?string $navigationLabel = 'Contact Us';

  protected static ?string $navigationGroup = 'Contact Us';

  protected static ?int $navigationSort = 7;

  public static ?string $label = 'Contact Us';

  protected static ?string $slug = 'contact-us';

  public static function form(Form $form): Form
  {
    return $form->schema([
      Card::make()
        ->schema([
          TextArea::make('alamat')->required()->rows(3)->maxLength(255),
          TextInput::make('no_telp')
            ->required()
            ->label('No Telp')
            ->tel()
            ->telRegex('/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.\/0-9]*$/')
            ->maxLength(255),
          TextInput::make('no_wa')
            ->required()
            ->label('No Whatsapp')
            ->tel()
            ->telRegex('/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.\/0-9]*$/')
            ->maxLength(255),
          TextInput::make('link_no_wa')->label('Link No Whatsapp')->url()->maxLength(255),
          TextInput::make('jam_kerja')->label('Working Hours')->maxLength(255),
          TextInput::make('email')->email()->maxLength(255),
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
        TextColumn::make('no_telp')->label('No Telp'),
        TextColumn::make('no_wa')->label('No Whatsapp'),
        TextColumn::make('alamat')->words(7),
      ])
      ->selectable(false)
      ->filters([
        //
      ])
      ->actions([ViewAction::make(), EditAction::make(), DeleteAction::make()])
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
      'index' => Pages\ListKontakKamis::route('/'),
      'create' => Pages\CreateKontakKami::route('/create'),
      'edit' => Pages\EditKontakKami::route('/{record}/edit'),
    ];
  }
}
