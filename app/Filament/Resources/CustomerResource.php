<?php

namespace App\Filament\Resources;

use App\Filament\Resources\CustomerResource\Pages;
use App\Filament\Resources\CustomerResource\RelationManagers;
use App\Models\Customer;
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
use Filament\Forms\Components\Select;
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

class CustomerResource extends Resource
{
  protected static ?string $model = Customer::class;

  protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

  public static function form(Form $form): Form
  {
    return $form->schema([
      Card::make()
        ->schema([
          TextInput::make('name')->maxLength(255),
          TextInput::make('no_hp')->maxLength(255)->label('No Hp')->required()->tel()
          ->telRegex('/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.\/0-9]*$/')->maxLength(15),
          TextInput::make('email')->email()->maxLength(255),
          TextArea::make('alamat')->maxLength(255),
          Select::make('services')
            ->label('Services')
            ->options([
                'perbaikan_listrik' => 'Perbaikan Listrik',
                'pasang_listrik' => 'Pasang Listrik',
            ])
            ->searchable(),
          TextArea::make('note')->maxLength(255)->label('Catatan'),
        ])
        ->columnSpanFull(),
    ]);
  }

  public static function table(Table $table): Table
  {
    return $table
      ->columns([
        TextColumn::make('name')->searchable()->words(2),
        TextColumn::make('no_hp')->searchable()->words(2),
        TextColumn::make('email')->searchable()->words(0),
      ])
      ->defaultSort('created_at', 'desc')
      ->striped()
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
      'index' => Pages\ListCustomers::route('/'),
      'create' => Pages\CreateCustomer::route('/create'),
      'edit' => Pages\EditCustomer::route('/{record}/edit'),
    ];
  }
}
