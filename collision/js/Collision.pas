unit Collision;

interface

uses AsphyreDef, Math;

type
  TPolygon_Points = array of TPoint2;

  TCollision = class
  private

  public
    constructor Create;

    // ���������� true ���� �������[a1,a2] � [b1,b2] ������������
    // ����� - false (�� ����������� ����������� ���������� ������� !!!)
    function Piece_Intersect(a1,a2,b1,b2: TPoint2): boolean;

    // ���������� true ���� ��������� ����� �������[a1,a2] ��������
    // � [b1,b2] ��� ��������
    function Is_Piece_Points(a1,a2,b1,b2: TPoint2): boolean;

    // ���������� true ���� �������� p1 � p2 ������������
    // ����� - false
    function Polygon_Intersect(p1,p2: TPolygon_Points): boolean;

    // ���������� true ���� ������� p � ������� [a1,a2] ������������
    // ����� - false
    function Polygon_and_Piece_Intersect(p: TPolygon_Points; a1,a2: TPoint2): boolean;

    // ������ �� ������ �������
    procedure Draw_Polygon(p: TPolygon_Points; Color: Cardinal);

    // ���������� true ���� ���������� c �������� � �1 � �2 �
    // ��������� r1 � r2 ������������, ����� - false
    function Circle_Intersect(c1: TPoint2; r1: single; c2: TPoint2;
      r2: single): boolean;

    // ���������� ����� ����������� �������� [a1,a2] � [b1,b2]
    // �������� ������ ���� ������� ������������ !!!
    // ���� ������� ��������� - ������ �������� �����������
    function Piece_Int_Point(a1,a2,b1,b2: TPoint2): TPoint2;

    // ���������� ���� �� ����� ����������� ������� [a1,a2] � �������� "p"
    // ���� �� ������������ ���������� (0,0) !!!
    // ���� ��������� - ������ �������� ����������� �� (�����, �����)
    function Polygon_and_Piece_Int_Point(p: TPolygon_Points; a1,a2: TPoint2): TPoint2;

    // ���������� ����� ����������� ������� [a1,a2] � �������� "p"
    // ���� ����� ��������� ���������� ������� ����� ����
    // ���� �� ������������ ���������� (0,0) !!!
    // ���� ��������� - ������ �������� ����������� �� (�����, �����)
    function Polygon_and_Piece_Int_Point_2(p: TPolygon_Points; a1,a2: TPoint2): TPoint2;

    // ���������� true ���� ����� "z" �������� � ������ "p"
    // ������ "p" - ��������� �������
    // (��������� ����� ������ ��������� � 1-�)
    function Point_in_RGN(p: TPolygon_Points; z: TPoint2): boolean;

    //---------------------------------------------------------------

    // ���������� ���� ������������� ����� �c� ������������ ������ (a, b).
    // ���� ����� �c� ����� �� ������, �� Orient() ���������� 0.
    function Orient(a,b,c: TPoint2): shortint;
        
    // ���������� ������ ������� [�1, �2]
    function Long(c1: TPoint2; c2: TPoint2): single;

    // ���������� ����� - �������� ������� [�1, �2]
    function Center(c1, c2: TPoint2): TPoint2;

    // ���������� true ���� ����� "c" ����������� ������� [�1,a2]
    function Point_in_Piece(a1,a2,c: TPoint2): boolean;

    // ���������� true ���� ������ [a1,a2] ��������� � [d1,d2]
    function  Line_in_Line(a1,a2,d1,d2: TPoint2): boolean;

    // ������������ ����� "a" ������������ ����� "o" �� ���� "ug"
    // �� ������� (ug - � ��������)
    function Rotate_point(a, o: TPoint2; ug: single): TPoint2;

    // ���������� ������ ���� � �������� ����� ��������� (o, a2) � (o, b2)
    function Corner_vectors(o, a2, b2: TPoint2): single;

  end;

implementation

uses Unit1;

{ TCollision }

constructor TCollision.Create;
begin

end;  

function TCollision.Orient(a,b,c: TPoint2): shortint;
var temp: single;
begin
  temp:= (a.x - c.x)*(b.y - c.y) - (a.y - c.y)*(b.x - c.x);
  
  if temp <= 0 then
  begin
    if temp = 0 then result:= 0
                else result:= -1;
  end else begin
    result:= 1;
  end;
end;

function TCollision.Piece_Intersect(a1, a2, b1, b2: TPoint2): boolean;
var temp1,temp2: shortint;
begin
  result:= false;

  //���� ������� �����
  if (a1.x < b1.x)and(a1.x < b2.x)and
     (a2.x < b1.x)and(a2.x < b2.x) then   exit;

  //���� ������� ������
  if (a1.x > b1.x)and(a1.x > b2.x)and
     (a2.x > b1.x)and(a2.x > b2.x) then   exit;

  //���� ������� ����
  if (a1.y < b1.y)and(a1.y < b2.y)and
     (a2.y < b1.y)and(a2.y < b2.y) then   exit;

  //���� ������� ����
  if (a1.y > b1.y)and(a1.y > b2.y)and
     (a2.y > b1.y)and(a2.y > b2.y) then   exit;

  temp1:= Orient(Point2(b1.x,b1.y),Point2(b2.x,b2.y),Point2(a1.x,a1.y))*
         Orient(Point2(b1.x,b1.y),Point2(b2.x,b2.y),Point2(a2.x,a2.y));

  temp2:= Orient(Point2(a1.x,a1.y),Point2(a2.x,a2.y),Point2(b1.x,b1.y))*
         Orient(Point2(a1.x,a1.y),Point2(a2.x,a2.y),Point2(b2.x,b2.y));

  if temp1 <> temp2 then exit;

  if temp1 <= 0 then result:= true
                else result:= false;
end;

function TCollision.Piece_Int_Point(a1, a2, b1, b2: TPoint2): TPoint2;
var d1, d2, n1, n2, c: TPoint2;
begin
  if Long(a1,a2) <= Long(b1,b2) then
  begin
    // �������, ��� �����
    d1:= Point2(a1.x, a1.y);
    d2:= Point2(a2.x, a2.y);
    // 2-� �������
    n1:= Point2(b1.x, b1.y);
    n2:= Point2(b2.x, b2.y);
  end else begin
     // �������, ��� �����
    d1:= Point2(b1.x, b1.y);
    d2:= Point2(b2.x, b2.y);
    // 2-� �������
    n1:= Point2(a1.x, a1.y);
    n2:= Point2(a2.x, a2.y);
  end;

  //���� ������� ���������
  if Line_in_Line(a1, a2, b1, b2) then
  begin
    result:= Center(d1, d2);
    exit;
  end;

  while (abs(d1.x - d2.x) > 0.001) or (abs(d1.y - d2.y) > 0.001) do
  begin
    c:= Center(d1, d2);
    if Piece_Intersect(d1,c, n1,n2) or Is_Piece_Points(d1,c, n1,n2) then
    begin
      d2:= Point2(c.x, c.y);
    end else begin
      d1:= Point2(c.x, c.y);
    end;
  end;

  result:= Point2(d1.x, d1.y);
end;

function TCollision.Point_in_Piece(a1, a2, c: TPoint2): boolean;
var k, b: single;
begin
  result:= false;

  //���� ����� �����
  if (a1.x < c.x)and(a2.x < c.x)then   exit;

  //���� ����� ������
  if (a1.x > c.x)and(a2.x > c.x) then   exit;

  //���� ����� ����
  if (a1.y < c.y)and(a2.y < c.y) then   exit;

  //���� ����� ����
  if (a1.y > c.y)and(a2.y > c.y) then   exit;

  if Orient(Point2(a1.x,a1.y),Point2(a2.x,a2.y),Point2(c.x,c.y)) = 0 then  result:= true;

end;

function TCollision.Point_in_RGN(p: TPolygon_Points; z: TPoint2): boolean;
var i: integer;
    np: integer;
    lx, rx, s: single;
    count: integer;
begin
  np:= length(p);

  // ������� ������ �������
  lx:= p[0].x;
  rx:= p[0].x;
  for i:= 1 to np-1 do
  begin
    if lx < p[i].x then lx:=  p[i].x;
    if rx > p[i].x then rx:=  p[i].x;
  end;
  s:= rx - lx;

  // ��������� �� ����������� ������� ��� �����
  // ��������� ����� � ���������
  count:= 0;
  for i:= 0 to np-2 do
  begin
    if Piece_Intersect(p[i],p[i+1],z,Point2(z.x-s, z.y)) or
       Point_in_Piece(p[i],p[i+1],Point2(z.x-s, z.y)) then
    begin
      inc(count);
    end; 
  end;

  // ���� �������
  if (count mod 2 <> 0) then result:= true
                        else result:= false;

end;

function TCollision.Polygon_and_Piece_Intersect(p: TPolygon_Points; a1,
  a2: TPoint2): boolean;
var i: integer;
    np: integer;
begin
  result:= false;
  np:= length(p);

  for i:= 0 to np-2 do
  begin
    result:= result or Piece_Intersect(p[i],p[i+1],a1,a2) or
             Is_Piece_Points(p[i],p[i+1],a1,a2); 
  end;
end;

function TCollision.Polygon_and_Piece_Int_Point(p: TPolygon_Points; a1,
  a2: TPoint2): TPoint2;
var i: integer;
    np: integer;
begin
  result:= Point2(0,0);
  np:= length(p);

  for i:= 0 to np-2 do
  begin
    if Piece_Intersect(p[i],p[i+1],a1,a2) or Is_Piece_Points(p[i],p[i+1],a1,a2) then
    begin
      result:= Piece_Int_Point(p[i],p[i+1],a1,a2);
      exit;
    end;
  end;
end;

function TCollision.Polygon_and_Piece_Int_Point_2(p: TPolygon_Points; a1,
  a2: TPoint2): TPoint2;
var i: integer;
    np: integer;
    a: array of TPoint2;
    na: integer;
    xl,xr,yt,yb: single;
begin
  result:= Point2(0,0);
  np:= length(p);
  SetLength(a,np-1);

  na:= -1;
  // ���� ����� �����������
  for i:= 0 to np-2 do
  begin
    if Piece_Intersect(p[i],p[i+1],a1,a2) or Is_Piece_Points(p[i],p[i+1],a1,a2) then
    begin
      inc(na);
      a[na]:= Piece_Int_Point(p[i],p[i+1],a1,a2);
    end;
  end;

  // ������� ��������� �����
  xl:= a[0].x; xr:= a[0].x;
  yt:= a[0].y; yb:= a[0].y;
  for i:= 1 to na do
  begin
    if a[i].x < xl then xl:= a[i].x;
    if a[i].x > xr then xr:= a[i].x;
    if a[i].y < yt then yt:= a[i].y;
    if a[i].y > yb then yb:= a[i].y;
  end;

  result.x:= (xl + xr)/2;
  result.y:= (yt + yb)/2;
end;

function TCollision.Polygon_Intersect(p1, p2: TPolygon_Points): boolean;
var i,j: integer;
    np1,np2: integer;
begin
  result:= false;
  np1:= length(p1);
  np2:= length(p2);

  for i:= 0 to np1-2 do
  begin
    for j:= 0 to np2-2 do
    begin
       result:= result or Piece_Intersect(p1[i],p1[i+1],p2[j],p2[j+1]) or
                Is_Piece_Points(p1[i],p1[i+1],p2[j],p2[j+1]);
    end;
    result:= result or Piece_Intersect(p1[i],p1[i+1],p2[np2-1],p2[0]) or
             Is_Piece_Points(p1[i],p1[i+1],p2[np2-1],p2[0]);
  end;

end;

procedure TCollision.Draw_Polygon(p: TPolygon_Points; Color: Cardinal);
var i: integer;
    np1: integer;
begin
  np1:= length(p);
  for i:= 0 to np1-2 do
  begin
    Form1.MyCanvas.Line(p[i].x,
                        p[i].y - Form1.Engine.WorldY,
                        p[i+1].x,
                        p[i+1].y - Form1.Engine.WorldY,
                        Color,Color,1);
  end;

end;

function TCollision.Is_Piece_Points(a1, a2, b1, b2: TPoint2): boolean;
begin
  if Point_in_Piece(a1,a2,b1) or Point_in_Piece(a1,a2,b2) or
     Point_in_Piece(b1,b2,a1) or Point_in_Piece(b1,b2,a2) then
  begin
    result:= true;
  end else begin
    result:= false;
  end;
end;

function TCollision.Line_in_Line(a1, a2, d1, d2: TPoint2): boolean;
var k1, k2, b1, b2: single;
begin
  k1:= (a2.y - a1.y)/(a2.x - a1.x);
  b1:= a1.y - k1*a1.x;

  k2:= (d2.y - d1.y)/(d2.x - d1.x);
  b2:= d1.y - k2*d1.x;

  if (k1 = k2)and(b1 = b2) then result:= true
                           else result:= false;
end;

function TCollision.Long(c1, c2: TPoint2): single;
begin
  result:= sqrt(sqr(c1.x - c2.x) + sqr(c1.y - c2.y)); 
end;

function TCollision.Center(c1, c2: TPoint2): TPoint2;
begin
  result.x:= (c1.x + c2.x)/2;
  result.y:= (c1.y + c2.y)/2;
end;

function TCollision.Circle_Intersect(c1: TPoint2; r1: single; c2: TPoint2;
  r2: single): boolean;
begin
  if  (sqrt(sqr(c1.x - c2.x) + sqr(c1.y - c2.y)) <= r1 + r2)
   then result:= true
   else result:= false;
end;

function TCollision.Corner_vectors(o, a2, b2: TPoint2): single;
var ax, ay, bx, by: single;
begin
  ax:= a2.x - o.x;
  ay:= a2.y - o.y;
  bx:= b2.x - o.x;
  by:= b2.y - o.y;

  result:= (ax*bx + ay*by)/(sqrt(ax*ax+ay*ay)*sqrt(bx*bx+by*by));
  result:= ArcCos(result);
end;

function TCollision.Rotate_point(a, o: TPoint2; ug: single): TPoint2;
var nx, ny: single;  
begin
  a.x:= a.x - o.x;
  a.y:= a.y - o.y;
  nx:=  a.x*cos(ug) - a.y*sin(ug) + o.x;
  ny:=  a.y*cos(ug) + a.x*sin(ug) + o.y;
  result:= Point2(nx, ny);
end;

end.


